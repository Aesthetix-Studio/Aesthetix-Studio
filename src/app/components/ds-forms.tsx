import { useState } from "react";
import { Eye, EyeOff, Search, Mail, Lock, User, ChevronDown, Check, AlertCircle } from "lucide-react";
import { DSSection, DSSubSection, DSPreview } from "./ds-section";
import { cn } from "./ui/utils";

/* ─── AX Input ─────────────────────────────────────────────── */
interface AXInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  optional?: boolean;
}

export function AXInput({ label, helper, error, leadingIcon, trailingIcon, optional, className, id, ...props }: AXInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="flex items-center gap-1 mb-1.5 text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>
          {label}
          {optional && <span className="text-muted-foreground ml-1" style={{ fontWeight: 400, fontSize: '11px' }}>(optional)</span>}
        </label>
      )}
      <div className="relative">
        {leadingIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ pointerEvents: 'none' }}>
            {leadingIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full h-9 px-3 rounded-lg border text-foreground placeholder:text-muted-foreground/50 text-sm",
            "bg-input-background border-border",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-destructive focus:ring-destructive/30 focus:border-destructive",
            leadingIcon && "pl-9",
            trailingIcon && "pr-9",
            className
          )}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {trailingIcon}
          </div>
        )}
      </div>
      {error ? (
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle className="w-3 h-3 text-destructive shrink-0" />
          <p className="text-destructive" style={{ fontSize: '12px' }}>{error}</p>
        </div>
      ) : helper ? (
        <p className="mt-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>{helper}</p>
      ) : null}
    </div>
  );
}

/* ─── AX Textarea ───────────────────────────────────────────── */
interface AXTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
  optional?: boolean;
}

export function AXTextarea({ label, helper, error, optional, className, id, ...props }: AXTextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="flex items-center gap-1 mb-1.5 text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>
          {label}
          {optional && <span className="text-muted-foreground ml-1" style={{ fontWeight: 400, fontSize: '11px' }}>(optional)</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-3 py-2.5 rounded-lg border text-foreground placeholder:text-muted-foreground/50",
          "bg-input-background border-border resize-none",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error && "border-destructive focus:ring-destructive/30",
          className
        )}
        style={{ fontSize: '13px' }}
        rows={4}
        {...props}
      />
      {error ? (
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle className="w-3 h-3 text-destructive shrink-0" />
          <p className="text-destructive" style={{ fontSize: '12px' }}>{error}</p>
        </div>
      ) : helper ? (
        <p className="mt-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>{helper}</p>
      ) : null}
    </div>
  );
}

/* ─── AX Select ─────────────────────────────────────────────── */
interface AXSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  options: { value: string; label: string }[];
  optional?: boolean;
}

export function AXSelect({ label, helper, error, options, optional, className, id, ...props }: AXSelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="flex items-center gap-1 mb-1.5 text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>
          {label}
          {optional && <span className="text-muted-foreground ml-1" style={{ fontWeight: 400, fontSize: '11px' }}>(optional)</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full h-9 pl-3 pr-8 rounded-lg border text-foreground appearance-none cursor-pointer",
            "bg-input-background border-border",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-destructive",
            className
          )}
          style={{ fontSize: '13px' }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      {error ? (
        <p className="mt-1.5 text-destructive" style={{ fontSize: '12px' }}>{error}</p>
      ) : helper ? (
        <p className="mt-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>{helper}</p>
      ) : null}
    </div>
  );
}

/* ─── AX Checkbox ───────────────────────────────────────────── */
interface AXCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
}

export function AXCheckbox({ label, checked = false, onChange, disabled, description }: AXCheckboxProps) {
  return (
    <label className={cn("flex items-start gap-2.5 cursor-pointer group", disabled && "opacity-40 cursor-not-allowed")}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all duration-150",
          checked
            ? "bg-foreground border-foreground"
            : "bg-input-background border-border group-hover:border-foreground/40"
        )}
      >
        {checked && <Check className="w-2.5 h-2.5 text-background" strokeWidth={3} />}
      </div>
      <div>
        <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{label}</div>
        {description && <div className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>{description}</div>}
      </div>
    </label>
  );
}

/* ─── AX Radio ──────────────────────────────────────────────── */
interface AXRadioProps {
  label: string;
  value: string;
  selected: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  description?: string;
}

export function AXRadio({ label, value, selected, onSelect, disabled, description }: AXRadioProps) {
  const isSelected = selected === value;
  return (
    <label className={cn("flex items-start gap-2.5 cursor-pointer group", disabled && "opacity-40 cursor-not-allowed")}>
      <div
        onClick={() => !disabled && onSelect(value)}
        className={cn(
          "mt-0.5 w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-all duration-150",
          isSelected
            ? "border-foreground"
            : "bg-input-background border-border group-hover:border-foreground/40"
        )}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-foreground" />}
      </div>
      <div>
        <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{label}</div>
        {description && <div className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>{description}</div>}
      </div>
    </label>
  );
}

/* ─── AX Switch ─────────────────────────────────────────────── */
interface AXSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export function AXSwitch({ label, checked = false, onChange, disabled, size = "md" }: AXSwitchProps) {
  const trackSize = size === "sm" ? "w-7 h-4" : "w-10 h-6";
  const thumbSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const thumbTranslate = size === "sm" ? (checked ? "translate-x-3.5" : "translate-x-0.5") : (checked ? "translate-x-[18px]" : "translate-x-1");

  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer", disabled && "opacity-40 cursor-not-allowed")}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          "relative rounded-full transition-all duration-200",
          trackSize,
          checked ? "bg-foreground" : "bg-switch-background hover:bg-muted-foreground/50"
        )}
      >
        <div className={cn("absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-200", thumbSize, thumbTranslate)} />
      </div>
      {label && <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{label}</span>}
    </label>
  );
}

export function DSFormsSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState({ terms: true, newsletter: false, analytics: true });
  const [radio, setRadio] = useState("monthly");
  const [switches, setSwitches] = useState({ notifications: true, twoFactor: false, autoSave: true });

  return (
    <DSSection
      id="forms"
      title="Form Controls"
      description="Input, Textarea, Select, Checkbox, Radio, and Switch — all with label, helper, error, and disabled states. Keyboard navigable and WCAG AA compliant."
      badge="Components"
    >
      <DSSubSection title="Text Input — States">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <AXInput label="Full Name" placeholder="Jane Smith" leadingIcon={<User className="w-4 h-4" />} />
          <AXInput label="Email Address" placeholder="jane@example.com" leadingIcon={<Mail className="w-4 h-4" />} helper="We'll never share your email." />
          <AXInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            leadingIcon={<Lock className="w-4 h-4" />}
            trailingIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <AXInput label="Search" placeholder="Search projects…" leadingIcon={<Search className="w-4 h-4" />} optional />
          <AXInput label="Company Name" value="Acme Corp" error="Company name is already taken." onChange={() => {}} />
          <AXInput label="Disabled Field" placeholder="Not editable" disabled value="Read only" onChange={() => {}} />
        </div>
      </DSSubSection>

      <DSSubSection title="Textarea">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <AXTextarea label="Project Description" placeholder="Tell us about your project…" helper="Minimum 50 characters." rows={4} />
          <AXTextarea label="Feedback" placeholder="What did you think?" error="This field is required." rows={4} />
        </div>
      </DSSubSection>

      <DSSubSection title="Select">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <AXSelect
            label="Service Type"
            options={[
              { value: "", label: "Select a service" },
              { value: "branding", label: "Brand Identity" },
              { value: "web", label: "Web Design" },
              { value: "product", label: "Product Design" },
            ]}
          />
          <AXSelect
            label="Budget Range"
            options={[
              { value: "50k", label: "₹50,000 – ₹1,00,000" },
              { value: "1L", label: "₹1,00,000 – ₹2,50,000" },
              { value: "2.5L", label: "₹2,50,000+" },
            ]}
            optional
          />
          <AXSelect
            label="Timeline"
            options={[
              { value: "4w", label: "4 weeks" },
              { value: "8w", label: "8 weeks" },
              { value: "12w", label: "12+ weeks" },
            ]}
            error="Required field."
          />
        </div>
      </DSSubSection>

      <DSSubSection title="Checkbox">
        <div className="space-y-4 max-w-sm">
          <AXCheckbox label="I agree to the Terms of Service" checked={checked.terms} onChange={(v) => setChecked((s) => ({ ...s, terms: v }))} description="By continuing, you agree to our usage policy." />
          <AXCheckbox label="Subscribe to product updates" checked={checked.newsletter} onChange={(v) => setChecked((s) => ({ ...s, newsletter: v }))} />
          <AXCheckbox label="Enable analytics" checked={checked.analytics} onChange={(v) => setChecked((s) => ({ ...s, analytics: v }))} description="Helps us improve performance." />
          <AXCheckbox label="Disabled option" checked={false} onChange={() => {}} disabled />
        </div>
      </DSSubSection>

      <DSSubSection title="Radio Group">
        <div className="space-y-3 max-w-sm">
          <AXRadio label="Monthly billing" value="monthly" selected={radio} onSelect={setRadio} description="₹4,000/mo, billed monthly" />
          <AXRadio label="Annual billing" value="annual" selected={radio} onSelect={setRadio} description="₹3,200/mo, billed annually — save 20%" />
          <AXRadio label="Custom plan" value="custom" selected={radio} onSelect={setRadio} description="Contact sales for pricing" />
          <AXRadio label="Unavailable option" value="disabled" selected={radio} onSelect={setRadio} disabled />
        </div>
      </DSSubSection>

      <DSSubSection title="Switch">
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div>
              <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>Push Notifications</div>
              <div className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>Receive alerts for project updates</div>
            </div>
            <AXSwitch checked={switches.notifications} onChange={(v) => setSwitches((s) => ({ ...s, notifications: v }))} />
          </div>
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div>
              <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>Two-Factor Authentication</div>
              <div className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>Add extra security to your account</div>
            </div>
            <AXSwitch checked={switches.twoFactor} onChange={(v) => setSwitches((s) => ({ ...s, twoFactor: v }))} />
          </div>
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div>
              <div className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>Auto-save Drafts</div>
              <div className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>Automatically save your work every 2 minutes</div>
            </div>
            <AXSwitch checked={switches.autoSave} onChange={(v) => setSwitches((s) => ({ ...s, autoSave: v }))} />
          </div>
        </div>
      </DSSubSection>

      <DSSubSection title="Full Form Example">
        <DSPreview>
          <form className="max-w-md space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <h3 className="text-foreground mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>Start a Project</h3>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>Tell us about your vision. We'll be in touch within 24 hours.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AXInput label="First name" placeholder="Jane" />
              <AXInput label="Last name" placeholder="Smith" />
            </div>
            <AXInput label="Work email" placeholder="jane@company.com" leadingIcon={<Mail className="w-4 h-4" />} />
            <AXSelect
              label="Service"
              options={[
                { value: "", label: "Select a service…" },
                { value: "branding", label: "Brand Identity" },
                { value: "web", label: "Web Design" },
                { value: "product", label: "Product Design" },
              ]}
            />
            <AXTextarea label="Message" placeholder="Describe your project goals, timeline, and budget…" rows={3} optional />
            <AXCheckbox label="I agree to the Terms & Privacy Policy" checked={checked.terms} onChange={(v) => setChecked((s) => ({ ...s, terms: v }))} />
            <button
              type="submit"
              className="w-full h-9 rounded-lg bg-foreground text-background text-[13px] transition-all hover:bg-foreground/90 active:bg-foreground/80"
              style={{ fontWeight: 500 }}
            >
              Send Message
            </button>
          </form>
        </DSPreview>
      </DSSubSection>
    </DSSection>
  );
}
