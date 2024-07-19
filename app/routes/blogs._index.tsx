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
  const data = await getPagingArticles({ page });
  return data;
};

export default function Blog() {
  const { page, articles, nextPage, totalPages } = useLoaderData<LoaderData>();

  return (
    <div className="w-full">
      <div className="md:flex md:justify-between md:items-center">
        <h1>All articles</h1>
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
