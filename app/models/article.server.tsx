import { prisma } from "~/utils/db.server";
import { Article } from "@prisma/client";
import slugify from "slugify";
const perpage = 5;
export async function getPagingArticles({ page = 0 }: { page: Number }) {
  try {
    let getpage = parseInt(page);
    let total = await prisma.article.count();
    let totalPages = Math.ceil(total / perpage);

    if (getpage + 1 > totalPages) {
      return { articles: [], totalPages: totalPages, page: getpage };
    }
    let articles = await prisma.article.findMany({
      skip: perpage * getpage,
      take: perpage,
      orderBy: { createdAt: "desc" },
    });
    return { articles: articles, totalPages: totalPages, page: getpage };
  } catch (error) {
    console.log("err getPagingArticles");
  }
}

export async function getArticles(props: object) {
  return await prisma.article.findMany(props);
}

export async function getArticleById(id: string) {
  return await prisma.article.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      User: {
        select: { name: true, userName: true },
      },
    },
  });
}

export async function getArticleDetail(slug: string) {
  return await prisma.article.findFirstOrThrow({
    where: {
      slug: slug,
    },
    include: {
      User: {
        select: { name: true, userName: true },
      },
    },
  });
}

export async function createArticle(
  article: Pick<Article, "title" | "content" | "summary" | "tags" | "userId">
) {
  let slug = slugify(article.title);
  const data = {
    slug: slug,
    title: article.title,
    content: article.content,
    summary: article.summary,
    tags: article.tags,
    userId: article.userId,
    formattedDate: new Date().toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return await prisma.article.create({ data: data });
}
export async function updateArticle(
  article: Pick<
    Article,
    "title" | "content" | "summary" | "tags" | "userId" | "id"
  >
) {
  console.log("article", article);
  let slug = slugify(article.title);
  const data = {
    slug: slug,
    title: article.title,
    content: article.content,
    summary: article.summary,
    tags: article.tags,
  };

  return await prisma.article.update({ where: { id: article.id }, data });
}

export async function deleteArticle(id: String) {
  return await prisma.article.delete({
    where: {
      id: id,
    },
  });
}
