import { useState, useRef } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { uploadAsset } from "../../lib/api";
import { buildSupabaseStorageUrl } from "../../lib/api";
import { getSupabaseEnv } from "../../lib/session";
import { captureError } from "../../lib/error-tracking";

type AvatarUploadProps = {
  name: string;
  color?: string;
  currentAvatar?: string;
  onUpload: (url: string) => void;
};

export function AvatarUpload({ name, color = "#6150F6", currentAvatar, onUpload }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const key = `avatars/${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${file.name.split(".").pop()}`;
      await uploadAsset(file, key);
      const env = getSupabaseEnv();
      if (env) {
        const url = buildSupabaseStorageUrl({ supabaseUrl: env.url, bucket: env.bucket, path: key });
        setPreview(url);
        onUpload(url);
      }
    } catch (err) {
      captureError(err, { context: "avatar-upload", name });
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview ?? currentAvatar;

  return (
    <div className="relative group">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer overflow-hidden"
        style={{ background: displayUrl ? undefined : color, backgroundImage: displayUrl ? `url(${displayUrl})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}
        onClick={() => fileRef.current?.click()}
      >
        {!displayUrl && initials}
      </div>
      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => fileRef.current?.click()}>
        {uploading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
      </div>
      {displayUrl && (
        <button onClick={() => { setPreview(null); onUpload(""); }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
