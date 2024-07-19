import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteArticle } from "~/models/article.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  console.log("deleteArticle", params.id);
  invariant(params.id, "Missing id param");
  await deleteArticle(params.id);
  return redirect("/admin");
};
