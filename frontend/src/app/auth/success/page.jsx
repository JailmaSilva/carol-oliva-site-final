"use client";

import { Suspense } from "react";
import SuccessPage from "./success-page";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessPage />
    </Suspense>
  );
}

// ❗ impedir o Next de gerar estático
export const dynamic = "force-dynamic";
