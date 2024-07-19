import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Article } from "@prisma/client";
import { ArticlesList } from "~/components/articlesList";
import { getPagingArticles } from "~/models/article.server";

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
    <div className="w-full">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our Blog
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>
      </div>
      <ArticlesList
        articles={articles}
        page={page}
        totalPages={totalPages}
        nextPage={nextPage}
      />
    </div>
  );
}
