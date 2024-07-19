import type { Article } from "@prisma/client";
import { Card } from "./cards";
import { InternalLink } from "./internalLink";

type ArticleType = Pick<
  Article,
  "formattedDate" | "slug" | "summary" | "title"
>;

interface Props {
  page: number;
  articles: ArticleType[];
  nextPage: number | 0;
  totalPages: number;
}

export const ArticlesList = ({
  articles,
  page,
  nextPage,
  totalPages,
}: Props) => {
  console.log("articles", articles);
  return (
    <div className="prose-h3:mb-0 lg:prose-h3:mb-0 prose-p:my-2 lg:prose-p:my-2">
      {articles.length >= 1 ? (
        <>
          <div className="not-prose sm:flex flex-wrap">
            {articles.map((article, index) => (
              <div key={article.slug} className="sm:w-1/2 mb-12">
                <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                  <Card {...article} />
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16 flex justify-between">
            {page > 0 && (
              <InternalLink to={`?page=${page - 1}`}>Previous</InternalLink>
            )}
            {page + 1} of {totalPages}
            {page + 1 < totalPages && (
              <InternalLink to={`?page=${page + 1}`}>Next</InternalLink>
            )}
          </div>
        </>
      ) : (
        <div className="not-prose sm:flex flex-wrap">
          <h3>No results</h3>
        </div>
      )}
    </div>
  );
};
