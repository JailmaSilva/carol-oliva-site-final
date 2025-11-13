export const metadata = {
  title: "Carol Oliva Fotografia",
  description: "Seleção e entrega de fotos e vídeos em alta resolução",
};
import "./globals.css";
import Header from "../components/Header";
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-paper text-ink min-h-screen">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
