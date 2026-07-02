import { useEffect } from "react";
import { useLocation } from "react-router";

const GA4_ID = import.meta.env.VITE_GA4_ID || "";
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || "";

function loadScript(src: string, id?: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (id) s.id = id;
  document.head.appendChild(s);
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA4_ID) return;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA4_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!GA4_ID) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["config", GA4_ID, { page_path: location.pathname }]);
  }, [location.pathname]);

  useEffect(() => {
    if (!CLARITY_ID) return;
    loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    clarity?: (...args: unknown[]) => void;
  }
}
