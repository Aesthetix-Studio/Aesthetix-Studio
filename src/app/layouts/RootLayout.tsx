import { Outlet } from "react-router";
import { Analytics } from "../components/Analytics";

export default function RootLayout() {
  return (
    <>
      <Analytics />
      <Outlet />
    </>
  );
}
