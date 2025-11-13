"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Success() {
  const search = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = search.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/galleries");
    }
  }, [search, router]);
  return <div>Autenticando…</div>;
}
