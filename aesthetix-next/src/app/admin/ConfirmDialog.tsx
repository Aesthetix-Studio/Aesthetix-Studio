"use client";
import { useEffect, useCallback } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
        }}
      />
      {/* Dialog */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 101,
          width: "100%",
          maxWidth: "400px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid rgba(255,255,255,0.07)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          {danger && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)",
              }}
            />
          )}

          <div style={{ padding: "32px" }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "20px",
                fontStyle: "italic",
                color: "#F0EBE0",
                letterSpacing: "-0.02em",
                margin: "0 0 8px",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(240,235,224,0.45)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
                margin: "0 0 28px",
              }}
            >
              {message}
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={onCancel}
                style={{
                  background: "none",
                  color: "rgba(240,235,224,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "8px 18px",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                style={{
                  background: danger ? "rgba(239,68,68,0.15)" : "#F0EBE0",
                  color: danger ? "#f87171" : "#080808",
                  border: danger ? "1px solid rgba(239,68,68,0.3)" : "none",
                  padding: "8px 18px",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
