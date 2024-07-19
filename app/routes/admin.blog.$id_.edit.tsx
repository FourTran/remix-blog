import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { getArticleDetail } from "~/models/article.server";
import type { Article } from "@prisma/client";
import "@mdxeditor/editor/style.css";
import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";
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
  console.log("ArticleDetail", article);
  if (!article) {
    throw new Error("article not found");
  }
  return json({ article });
};

export default function ArticleDetailEdit() {
  const { article } = useLoaderData<typeof loader>();
  const markdown = `
  * Item 1
  * Item 2
  * Item 3
    * nested item

  1. Item 1
  2. Item 2
`;
  return (
    <Form key={article.id} id="article-form" method="post" className="">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-lg font-medium text-gray-800 mb-1"
        >
          Title
        </label>
        <input
          defaultValue={article.title}
          type="text"
          id="title"
          name="title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="slug"
          className="block text-lg font-medium text-gray-800 mb-1"
        >
          Slug
        </label>
        <input
          defaultValue={article.slug}
          type="text"
          id="slug"
          name="slug"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="Summary"
          className="block text-lg font-medium text-gray-800 mb-1"
        >
          Summary
        </label>
        <textarea
          defaultValue={article.content}
          id="Summary"
          name="Summary"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="Summary"
          className="block text-lg font-medium text-gray-800 mb-1"
        >
          content
        </label>
        <MDXEditor
          markdown={markdown}
          plugins={[headingsPlugin()]}
          className="border p-2"
        />
      </div>

      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
