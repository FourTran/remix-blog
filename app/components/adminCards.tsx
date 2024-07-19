import type { Article } from "@prisma/client";
import { Form, Link, redirect } from "@remix-run/react";
type Props = Pick<Article, "title" | "summary" | "slug" | "formattedDate">;

export const AdminCard = ({
  title,
  summary,
  slug,
  formattedDate,
  id,
}: Props) => {
  return (
    <div className=" pmax-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400 p-5">
        Published {formattedDate}
      </div>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {summary}
        </p>
        <div>
          <Link
            to={`blog/${id}`}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            View
          </Link>
          <Link
            to={`blog/${id}/edit`}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
