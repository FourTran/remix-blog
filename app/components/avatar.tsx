import avatar from "~/assets/fourtran.png";
export const AvatarUser = () => {
  return (
    <div className="not-prose w-8 h-8 sm:w-12 sm:h-12 mr-2">
      <img
        src={avatar}
        alt="Author's avatar"
        className="rounded-[50%] my-0 w-6 h-6 sm:w-10 sm:h-10 max-h-[100%]"
        loading="lazy"
      />
    </div>
  );
};
