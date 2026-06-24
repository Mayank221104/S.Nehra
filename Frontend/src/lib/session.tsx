import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
};

type SessionState = {
  user: User | null;
  loading: boolean;
  refetch: () => void;
};

const SessionContext = createContext<SessionState>({
  user: null,
  loading: true,
  refetch: () => {},
});

export const useSession = () => useContext(SessionContext);


  function getCookie(name: string): string | undefined {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const token = getCookie("paymentToken");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { credentials: "include" ,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, refetch: fetchMe }}>
      {children}
    </SessionContext.Provider>
  );
}
