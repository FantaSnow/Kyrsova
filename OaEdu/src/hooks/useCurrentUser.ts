import { useEffect, useState } from "react";
import UserService from "../api/services/UserService";

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    UserService.getMe()
      .then((data) => {
        if (mounted) setUser(data);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}