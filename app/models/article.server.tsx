import { prisma } from "~/utils/db.server";
import { Article } from "@prisma/client";
import slugify from "slugify";

export async function getArticles(props: object) {
  return await prisma.article.findMany(props);
}

export async function getArticleDetail(slug: string) {
  return await prisma.article.findFirstOrThrow({
    where: {
      slug: slug,
    },
  });
}

export async function createArticle(
  article: Pick<Article, "title" | "content" | "summary" | "tags" | "userId">
) {
  let slug = slugify(article.title);
  const data = { slug: slug, ...article };
  return await prisma.article.create({ data: data });
}

export async function deleteArticle(Article: Pick<Article, "id" | "userId">) {
  return await prisma.article.delete({
    where: {
      id: Article.id,
      userId: Article.userId,
    },
  });
}
