import "./globals.css";
import { Layout } from "./components/Layout";

export const metadata = {
  title: "Нейроотличные нейроотличным",
  description: "Платформа для нейроотличных детей, подростков, взрослых и их близких в Армении",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
