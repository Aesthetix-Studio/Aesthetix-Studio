
  import { createRoot } from "react-dom/client";
  import { HelmetProvider } from "react-helmet-async";
  import App from "./app/App.tsx";
  import { initErrorTracking } from "./app/lib/error-tracking";
  import "./styles/index.css";

  initErrorTracking();

  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
