"use client";

import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const sessionValid = await checkSession();
      if (sessionValid) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return children;
};

export default AuthProvider;