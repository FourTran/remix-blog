import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { getArticleDetail } from "~/models/article.server";
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
  let slug: string = params.slug;
  const article = await getArticleDetail(slug);
  if (!article) {
    throw new Error("article not found");
  }
  return json({ article });
};

export default function ArticleDetailEdit() {
  const { article } = useLoaderData<typeof loader>();
  return (
    <div>
      <GoBackButton />
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
            defaultValue={article.summary}
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
          <textarea
            defaultValue={article.content}
            id="Summary"
            name="Summary"
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 overflow-auto"
          />
        </div>
        <div className="flex items-end py-2">
          <button className=" md:text-lg border bg-sky-500 rounded-xl text-md text-white px-4 py-2  ml-auto">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
