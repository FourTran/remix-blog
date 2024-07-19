import { formatDate } from "~/utils/date";
import type { Article } from "@prisma/client";
import { AvatarUser } from "./avatar";
import { siteMetadata } from "~/siteMetadata";

interface Props {
  attributes: Pick<Article, "title" | "formattedDate">;
  author?: String;
}

export const ArticleHeader = ({ attributes, author }: Props) => {
  return (
    <div className="text-center">
      <h1>{attributes.title}</h1>
      <div className="flex flex-wrap justify-center items-center mb-4">
        <div className="not-prose w-8 h-8 sm:w-12 sm:h-12 mr-2">
          <AvatarUser />
        </div>
        <span className="mr-2">{author}</span>
        <span className="mr-2 hidden sm:block"> • </span>
        <span className="">{formatDate(attributes.formattedDate)}</span>
      </div>
      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
    </div>
  );
};
