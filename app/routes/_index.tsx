import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { AvatarUser } from "~/components/avatar";
import { Card } from "~/components/cards";
import { InternalLink } from "~/components/internalLink";
import { getArticles } from "~/models/article.server";
import { siteMetadata } from "~/siteMetadata";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const posts = await getArticles({});

  return json({
    posts: posts,
  });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
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
          {posts.map((post, index) => (
            <div key={post.slug} className="sm:w-1/2 mb-12">
              <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                <Card {...post} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 text-right">
        <InternalLink to="/blog">Older posts</InternalLink>
      </div>
    </div>
  );
}
