import { Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SessionProvider } from "./lib/session";

// TODO: Replace with actual SSR session fetch logic
const initialSession = null;

export default function App() {
  return (
    <ErrorBoundary>
      <SessionProvider initial={initialSession}>
        <Outlet />
      </SessionProvider>
    </ErrorBoundary>
  );
}
