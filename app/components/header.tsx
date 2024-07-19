import { Link } from "@remix-run/react";
import { siteMetadata } from "~/siteMetadata";
import { BlogLinks } from "./blogLinks";
import siteLogo from "~/assets/logo-text.png";
export const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-full w-full py-8 gap-x-12 md:gap-x-0">
      <Link
        className="home text-3xl font-medium no-underline flex-1 m-0 not-prose md:my-4"
        to="/"
      >
        <img alt="Website logo" src={siteLogo} loading="lazy" />
      </Link>

      <div className="sm:flex items-center gap-4 hidden flex-1 justify-end">
        <BlogLinks />
      </div>
    </header>
  );
};
