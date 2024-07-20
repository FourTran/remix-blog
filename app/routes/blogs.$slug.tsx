import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import styles from "highlight.js/styles/github-dark-dimmed.css";
import { ArticleHeader } from "~/components/articleHeader";
import { getArticleDetail } from "~/models/article.server";
import { siteMetadata } from "~/siteMetadata";
import type { Article } from "@prisma/client";
import { formatDate } from "~/utils/date";
import { AvatarUser } from "~/components/avatar";

export function ErrorBoundary() {
  const { slug } = useParams();
  return (
    <div className="error-container text-red-700">
      There was an error loading article by the id "${slug}". Sorry.
    </div>
  );
}
export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("loader");
  let slug: string = params.slug;
  const article = await getArticleDetail(slug);
  if (!article) {
    throw new Error("article not found");
  }
  return json({ article });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { description, title } = data
    ? {
        description: `Enjoy the "${data.article.summary}" joke and much more`,
        title: `"${data.article.title}" joke`,
      }
    : { description: "No article found", title: "No article" };

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title },
  ];
};

export default function ArticleDetail() {
  const { article } = useLoaderData<typeof loader>();

  const maxWidthClasses =
    "prose-pre:max-w-[90vw] md:prose-pre:max-w-2xl lg:prose-pre:max-w-3xl xl:prose-pre:max-w-5xl";
  const textClasses = "prose-a:text-blue-700 dark:prose-a:text-emerald-400";

  const publishedAt = formatDate(new Date(article.createdAt).toISOString());

  return (
    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert pt-5">
      <header className="mb-4 lg:mb-6 not-format text-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          {article.title}
        </h1>
        <address className="flex items-center mb-6 not-italic align-middle justify-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <AvatarUser />
            <div>
              <a
                href="#"
                rel="author"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {article.User?.name}
              </a>
              <p className="text-base text-gray-500 dark:text-gray-400">
                <time title={publishedAt}>{publishedAt}</time>
              </p>
            </div>
          </div>
        </address>
        <hr className="px-2 py-4 w-2/3 mx-auto text-sm" />
      </header>
      <p className="lead">{article.summary}</p>

      <div
        className="mt-12 prose prose-slate dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </article>
  );
}
