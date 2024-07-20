import type { Article } from "@prisma/client";
import { Card } from "./cards";
import { InternalLink } from "./internalLink";
import { ArticlesCardComponent } from "./articleCardComponents";

type ArticleType = Pick<
  Article,
  "formattedDate" | "slug" | "summary" | "title" | "createdAt"
>;

interface Props {
  page: number;
  articles: ArticleType[];
  nextPage: number | 0;
  totalPages: number;
}

export const AllArticles = ({
  articles,
  page,
  nextPage,
  totalPages,
}: Props) => {
  return (
    <>
      {articles.length >= 1 ? (
        <>
          {articles.map((article, index) => (
            <ArticlesCardComponent article={article} key={article.slug} />
          ))}
        </>
      ) : (
        <div className="not-prose sm:flex flex-wrap">
          <h3>No results</h3>
        </div>
      )}
    </>
  );
};
