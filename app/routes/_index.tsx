import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { AvatarUser } from "~/components/avatar";
import { Card } from "~/components/cards";
import { Header } from "~/components/header";
import { InternalLink } from "~/components/internalLink";
import { getArticles } from "~/models/article.server";
import { siteMetadata } from "~/siteMetadata";
import { getUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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
        <div className="flex flex-row items-center">
          <div className="flex items-center w-32 h-32 not-prose">
            <AvatarUser />
          </div>
          <h1 className="font-medium pl-4 xl:pl-8">Four Tran</h1>
        </div>

        <p className="pt-4">{siteMetadata.description}</p>

        <div className="mt-16">
          <div className="not-prose sm:flex flex-wrap">
            {articles.map((article, index) => (
              <div key={article.slug} className="sm:w-1/2 mb-12">
                <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                  <Card {...article} />
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
