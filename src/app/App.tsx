import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LiveChat } from "./components/LiveChat";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <LiveChat />
    </>
  );
}
