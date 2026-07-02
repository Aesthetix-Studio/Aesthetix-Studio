import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./ui/utils";
import {
  LayoutGrid, Palette, Type, Square, FormInput, Navigation2,
  CreditCard, Bell, Loader2, Columns, Sun, Moon, Menu, X, ChevronRight
} from "lucide-react";
import { AesthetixMark } from "./AesthetixMark";

export const DS_SECTIONS = [
  { id: "overview", label: "Overview", icon: LayoutGrid, group: "Introduction" },
  { id: "tokens", label: "Design Tokens", icon: Palette, group: "Foundation" },
  { id: "typography", label: "Typography", icon: Type, group: "Foundation" },
  { id: "buttons", label: "Buttons", icon: Square, group: "Components" },
  { id: "forms", label: "Form Controls", icon: FormInput, group: "Components" },
  { id: "navigation", label: "Navigation", icon: Navigation2, group: "Patterns" },
  { id: "cards", label: "Cards", icon: CreditCard, group: "Components" },
  { id: "feedback", label: "Feedback & Alerts", icon: Bell, group: "Components" },
  { id: "states", label: "States", icon: Loader2, group: "Components" },
  { id: "footer", label: "Footer", icon: Columns, group: "Patterns" },
];

interface DSSidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function DSSidebar({ activeSection, onSectionChange, isDark, onThemeToggle }: DSSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const groups = Array.from(new Set(DS_SECTIONS.map((s) => s.group)));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center shrink-0">
            <AesthetixMark size={15} color="#ffffff" />
          </div>
          <div>
            <div className="text-[13px] font-700 tracking-tight text-foreground" style={{ fontWeight: 700 }}>
              Aesthetix Studio
            </div>
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase" style={{ fontSize: '9px' }}>
              Design System v1.0
            </div>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((group) => (
          <div key={group}>
            <div className="px-2 mb-1.5 text-[10px] font-600 uppercase tracking-widest text-muted-foreground/70" style={{ fontWeight: 600 }}>
              {group}
            </div>
            <div className="space-y-0.5">
              {DS_SECTIONS.filter((s) => s.group === group).map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onSectionChange(section.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-150 group",
                      isActive
                        ? "bg-brand/10 text-brand font-500"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    style={{ fontWeight: isActive ? 500 : 400 }}
                  >
                    <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground")} />
                    <span className="flex-1 text-left">{section.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 text-brand/60" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground">Appearance</span>
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-secondary text-foreground text-[12px] hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-[11px] text-muted-foreground">WCAG AA Compliant</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-md"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-card border-r border-border lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 bg-card border-r border-border overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  );
}
