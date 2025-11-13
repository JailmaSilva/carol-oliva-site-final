"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessInner() {
  const params = useSearchParams();
  const token = params.get("token");
  return (
    <div style={{ padding: 24 }}>
      <h1>Login realizado com sucesso 🎉</h1>
      {token ? (
        <p>Token recebido: <code>{token}</code></p>
      ) : (
        <p>Nenhum token encontrado na URL.</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Carregando...</div>}>
      <SuccessInner />
    </Suspense>
  );
}

// impede pré-renderização/SSG dessa rota
export const dynamic = "force-dynamic";
