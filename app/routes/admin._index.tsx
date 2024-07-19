import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AdminCard } from "~/components/adminCards";
import { InternalLink } from "~/components/internalLink";
import { getArticles } from "~/models/article.server";
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

  const articles = await getArticles({});

  return json({
    articles: articles,
    user: user,
  });
};
export default function Index() {
  const { articles, user } = useLoaderData<typeof loader>();

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
          </div>
        </div>

        <div className="mb-16 text-right">
          <InternalLink to="/blogs">Older articles</InternalLink>
        </div>
      </div>
    </>
  );
}
