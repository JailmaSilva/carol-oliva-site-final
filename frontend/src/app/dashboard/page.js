"use client";
import Link from "next/link";
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-display">Dashboard do Fotógrafo</h1>
      <p>Crie galerias, faça upload e publique para o cliente.</p>
      <Link className="underline" href="/dashboard/novo">Criar nova galeria (placeholder)</Link>
    </div>
  );
}
