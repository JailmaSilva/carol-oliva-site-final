"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const token = params.get("token");

  return (
    <div>
      Logado com sucesso! Seu token: {token}
    </div>
  );
}
