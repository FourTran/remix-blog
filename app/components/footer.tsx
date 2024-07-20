import { siteMetadata } from "~/siteMetadata";
import { SocialMedia } from "./socialMedia";
import bg from "~/assets/bg.png";
export const Footer = () => {
  return (
    <div className="mt-10">
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <img
            src={bg}
            alt=""
            className="w-[71.75rem] flex-none max-w-none dark:hidden"
            decoding="async"
          />
        </div>
      </div>
      <SocialMedia />
      <div className="py-4 flex flex-col justify-center items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:flex-row ">
        <div>{siteMetadata.author}</div>
        <div className="hidden sm:block">{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div className="hidden sm:block">{` • `}</div>
      </div>
    </div>
  );
};
