import { Outlet, useLocation } from "react-router";
import { HPNav } from "../components/hp-nav";
import { AXFooter } from "../components/ds-footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <HPNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <AXFooter variant="default" />
    </div>
  );
}
