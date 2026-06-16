import "./globals.css";
import { reader } from "../lib/reader";

export async function generateMetadata() {
  try {
    const g = await reader.singletons.globalSettings.read();
    return {
      title: g?.siteName ?? "Нейроотличные нейроотличным",
      description: g?.siteDescription ?? "Платформа для нейроотличных детей, подростков, взрослых и их близких в Армении",
    };
  } catch {
    return {
      title: "Нейроотличные нейроотличным",
      description: "Платформа для нейроотличных детей, подростков, взрослых и их близких в Армении",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
