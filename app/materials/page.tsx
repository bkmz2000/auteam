import Link from "next/link";

export const dynamic = "force-dynamic";

export default function MaterialsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Открытые материалы</h1>
          <p className="text-xl text-textSecondary max-w-3xl">
            Делимся знаниями и опытом. Здесь вы найдёте тексты, документы, методички,
            доклады, видео и многое другое.
          </p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-textSecondary mb-8 text-center">
            Материалы появятся после наполнения контентом через TinaCMS.
          </p>
        </div>
      </section>

      {/* Grants Section */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4">Гранты и фонды</h2>
            <p className="text-textSecondary mb-6">
              Вот несколько фондов и грантов, куда можно обратиться за поддержкой:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "IDEA", url: "https://www.idea.am/ru/" },
                { name: "Ника Фонд", url: "https://nikafund.am/ru/glavnaya/" },
                { name: "Фонд Степана Гишяна", url: "https://arka.am/news/business/fond-stepan-gishyan-nachal-sbor-grantovykh-zayavok-na-2025-god/" },
                { name: "Фонд Альберта Тамберджи", url: "https://www.soar-us.org/ru/" },
              ].map((grant) => (
                <a
                  key={grant.name}
                  href={grant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:shadow-md transition-shadow"
                >
                  <span className="w-8 h-8 rounded-lg bg-hover flex items-center justify-center text-sm font-bold text-textSecondary">
                    {grant.name[0]}
                  </span>
                  <span className="text-accent font-medium hover:underline">{grant.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
