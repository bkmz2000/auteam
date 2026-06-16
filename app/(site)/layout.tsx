import { Layout } from "../components/Layout";
import { reader } from "../../lib/reader";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let nav = {
    siteName: "Нейроотличные нейроотличным",
    footerDescription: "Платформа для нейроотличных детей, подростков, взрослых и их близких в Армении.",
    navHome: "Главная",
    navAbout: "О нас",
    navDropdown: "Что можем предложить",
    navChildren: "Детям",
    navTeens: "Подросткам",
    navAdults: "Взрослым",
    navParents: "Родителям",
    navTeachers: "Участники",
    navMaterials: "Материалы",
    navNews: "Новости",
    navJoin: "Присоединиться к сообществу",
    navContacts: "Контакты",
  };

  try {
    const g = await reader.singletons.globalSettings.read();
    if (g) nav = { ...nav, ...Object.fromEntries(Object.entries(g).filter(([, v]) => v)) };
  } catch {}

  return <Layout nav={nav}>{children}</Layout>;
}
