import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { createArticle, getArticleDetail } from "~/models/article.server";
import { GoBackButton } from "~/components/goBack";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";

function validateArticle(title: string, content: string) {
  let res = { title: null, content: null };
  if (title.length < 3) {
    res.title = "That article's title is too short";
  }
  if (content.length < 10) {
    res.content = "That article is too short";
  }
  return res;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  if (!form.get("title") || !form.get("content")) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }
  let tags = form.get("tags");
  let tagsArr: string[] | undefined = tags?.toString().split(",");
  const data = {
    title: form.get("title"),
    tags: tagsArr,
    summary: form.get("summary"),
    content: form.get("content"),
  };
  const fieldErrors = validateArticle(data.title, data.content);
  const fields = data;
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const article = await createArticle({ userId: userId, ...data });
  return redirect(`/admin`);
};
export default function ArticleDetailEdit() {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <GoBackButton />
      <Form id="article-form" method="post" className="">
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-800 mb-1"
          >
            Title
          </label>
          <input
            defaultValue={actionData?.fields?.title || ""}
            aria-invalid={Boolean(actionData?.fieldErrors?.title)}
            aria-errormessage={
              actionData?.fieldErrors?.title ? "name-error" : undefined
            }
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-800 mb-1"
          >
            tags
          </label>
          <input
            type="text"
            id="tags"
            defaultValue={actionData?.fields?.tags}
            name="tags"
            placeholder="video, article"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="summary"
            className="block text-lg font-medium text-gray-800 mb-1"
          >
            summary
          </label>
          <textarea
            defaultValue={actionData?.fields?.summary}
            id="summary"
            name="summary"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-800 mb-1"
          >
            content
          </label>
          <textarea
            defaultValue={actionData?.fields?.content}
            aria-invalid={Boolean(actionData?.fieldErrors?.content)}
            aria-errormessage={
              actionData?.fieldErrors?.content ? "name-error" : undefined
            }
            id="content"
            name="content"
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
