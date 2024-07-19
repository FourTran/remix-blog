import { Link, Outlet, redirect, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Article } from "@prisma/client";
import { ArticlesList } from "~/components/articlesList";
import { getPagingArticles } from "~/models/article.server";
import { getUser } from "~/utils/session.server";

interface LoaderData {
  page: number | 0;
  articles: Article[];
  nextPage: number | 0;
  totalPages: number;
  query: string | null;
}

export const loader = async ({ request }: { request: Request }) => {
  let user = await getUser(request);
  console.log("user", user);
  if (!user) {
    return redirect("/login");
  }
  return json({ user });
};

export default function AdminBlogs() {
  let { user } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-5">
        <Link prefetch="intent" to="/admin">
          <h3 className="md:text-2xl text-md text-blue-500">Blogs Board</h3>
        </Link>
        <Link
          prefetch="intent"
          to="/admin/blogs/new"
          className=" md:text-lg border bg-sky-500 rounded-xl text-md text-white md:px-4 md:py-2 px-2 py-1"
        >
          Create Article
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
