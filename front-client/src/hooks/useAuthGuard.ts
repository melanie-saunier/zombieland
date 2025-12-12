import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserContext from "@/context/useUserContext";

export function useAuthGuard() {
  const { user, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

}

