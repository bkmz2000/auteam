"use client";

import { PageQuery } from "../tina/__generated__/types";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";

export function Page(props: {
  data: PageQuery;
  variables: object;
  query: string;
}) {
  const { data } = useTina(props);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1
          data-tina-field={tinaField(data.page, "title")}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          {data.page.title}
        </h1>
        {data.page.logo?.url && (
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <Image
              src={data.page.logo.url}
              alt={data.page.logo?.alt || ""}
              className="dark:invert"
              width={180}
              height={37}
              priority
            />
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {data.page.links?.map((link, index) => {
          return (
            <a
              key={index}
              href={link?.url || "#"}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2
                data-tina-field={tinaField(link, "header")}
                className="mb-3 text-2xl font-semibold"
              >
                {link?.header}
              </h2>
              <p
                data-tina-field={tinaField(link, "description")}
                className="m-0 max-w-[30ch] text-sm opacity-50"
              >
                {link?.description}
              </p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
