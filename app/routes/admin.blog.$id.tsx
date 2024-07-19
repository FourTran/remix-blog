import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import styles from "highlight.js/styles/github-dark-dimmed.css";
import { ArticleHeader } from "~/components/articleHeader";
import {
  deleteArticle,
  getArticleById,
  getArticleDetail,
} from "~/models/article.server";
import { siteMetadata } from "~/siteMetadata";
import type { Article } from "@prisma/client";
import { formatDate } from "~/utils/date";
import { AvatarUser } from "~/components/avatar";
import { GoBackButton } from "~/components/goBack";

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
  let id: string = params.id;
  const article = await getArticleById(id);
  if (!article) {
    throw new Error("article not found");
  }
  return json({ article });
};
export const action = async ({ params }: ActionFunctionArgs) => {
  console.log("deleteArticle", params.id);
  invariant(params.id, "Missing id param");
  await deleteArticle(params.id);
  return redirect("/admin");
};
export default function ArticleDetail() {
  const { article } = useLoaderData<typeof loader>();

  const maxWidthClasses =
    "prose-pre:max-w-[90vw] md:prose-pre:max-w-2xl lg:prose-pre:max-w-3xl xl:prose-pre:max-w-5xl";
  const textClasses = "prose-a:text-blue-700 dark:prose-a:text-emerald-400";

  const publishedAt = new Date(article.createdAt).toISOString();
  return (
    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <GoBackButton />
      <header className="mb-4 lg:mb-6 not-format">
        <address className="flex items-center mb-6 not-italic">
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
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          {article.title}
        </h1>
      </header>
      <p className="lead">{article.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

      <div className="flex justify-end gap-4">
        <Link
          to={`edit`}
          prefetch="intent"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-8 py-2 text-center "
        >
          Edit
        </Link>
        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }

            // redirect(`/admin/blog/${article.id}/destroy`);
          }}
        >
          <button
            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="submit"
          >
            Delete
          </button>
        </Form>
      </div>
    </article>
  );
}
function invariant(id: string | undefined, arg1: string) {
  throw new Error("Function not implemented.");
}
