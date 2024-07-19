import avatar from "~/assets/fourtran.png";
export const AvatarUser = () => {
  return (
    <div className="not-prose w-8 h-8 sm:w-12 sm:h-12 mr-2">
      <img
        src={avatar}
        alt="Author's avatar"
        className="rounded-[50%] my-0 w-8 h-8 sm:w-12 sm:h-12"
        loading="lazy"
      />
    </div>
  );
};
