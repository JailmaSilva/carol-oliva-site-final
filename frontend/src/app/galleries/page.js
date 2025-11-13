"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import GalleryCard from "../../components/GalleryCard";
import { useRouter } from "next/navigation";
export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const router = useRouter();
  useEffect(() => {
    apiFetch("/api/galleries").then(d => setGalleries(d.galleries || []));
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display">Suas galerias</h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {galleries.map(g => (
          <div key={g.id} onClick={()=>router.push(`/galleries/${g.id}`)}>
            <GalleryCard gallery={g} />
          </div>
        ))}
        {galleries.length===0 && <p>Nenhuma galeria ainda.</p>}
      </div>
    </div>
  );
}
