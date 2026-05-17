import React, { createContext, useContext, useState, ReactNode } from "react";

export type Session = {
  user: null | { id: string; email: string; name?: string };
  token: string | null;
};

const SessionContext = createContext<Session | null>(null);
export const useSession = () => useContext(SessionContext);

export function SessionProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initial);
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
