import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AdminCard } from "~/components/adminCards";
import { InternalLink } from "~/components/internalLink";
import { getArticles, getPagingArticles } from "~/models/article.server";
import { deleteArticle, getArticleDetail } from "~/models/article.server";
import { getUser } from "~/utils/session.server";
export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const slug = form.get("method");
  console.log("slug", slug, form);
  if (form.get("_method") === "delete") {
    console.log("slug", slug);
    // const article = await getArticleDetail({ slug: slug });
    // if (!article) {
    //   throw new Response("Can't delete what does not exist", { status: 404 });
    // }
    // await deleteArticle({ id: article.id });
    return null;
  }
  return null;
};
export const loader = async ({ request }: { request: Request }) => {
  let user = await getUser(request);
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? 0;
  const data = await getPagingArticles({ page });
  return json({
    articles: data.articles,
    totalPages: data.totalPages,
    page: data.page,
    user: user,
  });
};
export default function Index() {
  const { user, articles, page, totalPages } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="max-w-full prose-h1:mb-0 lg:prose-h1:mb-0  prose-h3:mb-0 lg:prose-h3:mb-0 prose-p:my-2 lg:prose-p:my-2">
        <div className="mt-5">
          <div className="not-prose sm:flex flex-wrap">
            {articles.map((article, index) => (
              <div key={article.slug} className="sm:w-1/2 mb-12">
                <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                  <AdminCard {...article} />
                </div>
              </div>
            ))}
            <div className="mb-16 flex justify-between">
              {page > 0 && (
                <InternalLink to={`?page=${page - 1}`}>Previous</InternalLink>
              )}
              {page + 1} of {totalPages}
              {page + 1 < totalPages && (
                <InternalLink to={`?page=${page + 1}`}>Next</InternalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
