import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Article } from "@prisma/client";
import { ArticlesList } from "~/components/articlesList";
import { getPagingArticles } from "~/models/article.server";
import { AllArticles } from "~/components/allArticles";
import { InternalLink } from "~/components/internalLink";

interface LoaderData {
  page: number | 0;
  articles: Article[];
  nextPage: number | 0;
  totalPages: number;
  query: string | null;
}

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? 0;
  return await getPagingArticles({ page });
};

export default function Blog() {
  const { page, articles, nextPage, totalPages } = useLoaderData<LoaderData>();

  return (
    <>
      <main className="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
        <header className="py-16 sm:text-center">
          <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
            Latest Updates
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-400">
            All the latest news, straight from the&nbsp;team.
          </p>
          <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
            <h2 className="sr-only">Sign up for our newsletter</h2>
            <form action="#" method="#" className="flex flex-wrap -mx-2">
              <div className="px-2 grow-[9999] basis-64 mt-3">
                <div className="group relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    className="w-6 h-full absolute inset-y-0 left-3 text-slate-400 pointer-events-none group-focus-within:text-sky-500 dark:group-focus-within:text-slate-400"
                  >
                    <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
                    <path d="m6 7 6 5 6-5"></path>
                  </svg>
                  <input
                    name="email_address"
                    type="email"
                    autoComplete="email"
                    aria-label="Email address"
                    className="appearance-none shadow rounded-md ring-1 ring-slate-900/5 leading-5 sm:text-sm border border-transparent py-2 placeholder:text-slate-400 pl-12 pr-3 block w-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-700/20 dark:ring-slate-200/20 dark:focus:ring-sky-500 dark:text-white"
                    placeholder="Subscribe via email"
                  />
                </div>
              </div>
              <div className="px-2 grow flex mt-3">
                <button className="bg-sky-500 flex-auto shadow text-white rounded-md text-sm border-y border-transparent py-2 font-semibold px-3 hover:bg-sky-600 dark:hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 dark:focus:ring-offset-slate-900 dark:focus:ring-sky-700">
                  Subscribe
                </button>
              </div>
            </form>
          </section>
        </header>
        <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
          <div className="space-y-16">
            <AllArticles
              page={0}
              articles={articles}
              nextPage={0}
              totalPages={0}
            />
          </div>
        </div>
        <div className="mb-16 flex justify-between">
          {page > 0 && (
            <InternalLink to={`?page=${page - 1}`}>Previous</InternalLink>
          )}
          {page + 1} of {totalPages}
          {page + 1 < totalPages && (
            <InternalLink to={`?page=${page + 1}`}>Next</InternalLink>
          )}
        </div>
      </main>
    </>
  );
}
