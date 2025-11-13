export default function GalleryCard({ gallery }) {
  return (
    <div className="space-y-2 cursor-pointer group">
      <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
        <img src={gallery.coverUrl || "/placeholder.jpg"} alt={gallery.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div>
        <h3 className="font-medium">{gallery.title}</h3>
        <p className="text-sm opacity-70">{new Date(gallery.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
