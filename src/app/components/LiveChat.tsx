import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID || "";

export function LiveChat() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);

    return () => {
      document.head.removeChild(s);
    };
  }, []);

  return null;
}
