"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../../utils/api";
export default function GalleryPage() {
  const params = useParams();
  const { id } = params || {};
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/galleries/${id}/items`).then(d => {
      const arr = d.items || [];
      setItems(arr);
      setCount(arr.filter(i => i.selectedByClient).length);
    });
  }, [id]);
  const toggle = async (itemId) => {
    const d = await apiFetch(`/api/upload/select/${itemId}`, { method: "POST" });
    setItems(prev => prev.map(i => i.id===itemId ? { ...i, selectedByClient: d.selected } : i));
    setCount(c => d.selected ? c+1 : c-1);
  };
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-display">Galeria</h1>
      <div className="fixed bottom-6 right-6">
        <button disabled={count===0} className="px-5 py-3 rounded-2xl bg-accent text-white disabled:opacity-50">
          Concluir seleção ({count})
        </button>
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {items.map(item => (
          <div key={item.id} className="relative cursor-pointer" onClick={()=>toggle(item.id)}>
            <img src={item.urlThumbnail} alt="" className="w-full h-auto rounded-xl shadow" />
            {item.selectedByClient && <div className="absolute inset-0 bg-accent/40 rounded-xl" />}
            {item.type === "video" && <span className="absolute bottom-2 right-2 text-white text-xl">🎥</span>}
          </div>
        ))}
        {items.length===0 && <p>Sem itens nesta galeria.</p>}
      </div>
    </div>
  );
}
