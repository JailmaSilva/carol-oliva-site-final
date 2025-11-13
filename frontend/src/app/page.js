import Link from "next/link";
export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-5xl font-bold font-display">Carol Oliva Fotografia</h1>
      <p className="text-lg max-w-2xl mx-auto">
        Plataforma elegante para seleção de fotos e entrega final em alta resolução, com suporte a vídeos 4K.
      </p>
      <div className="space-x-3">
        <a href={process.env.NEXT_PUBLIC_API_URL + "/auth/instagram/login"} className="px-5 py-3 rounded-2xl bg-accent text-white">Entrar com Instagram</a>
        <Link className="px-5 py-3 rounded-2xl border" href="/galleries">Ver Galerias</Link>
      </div>
    </section>
  );
}
