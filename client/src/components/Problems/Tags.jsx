import { React } from "react";
import AllTags from "./AllTags";
import { FaAngleDown } from "react-icons/fa";

const Tags = ({ isTagsActive, activeTags, setActiveTags, handleClick }) => {
  return (
    <div className="dropdown relative" data-value="Tags">
      <div className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg" onClick={handleClick}>
        Tags
        {isTagsActive ? <FaAngleDown className="rotate-180 transition-all duration-300" /> : <FaAngleDown className="transition-all duration-300" />}
      </div>
      <AllTags activeTags={activeTags} setActiveTags={setActiveTags} isTagsActive={isTagsActive} />
    </div>
  );
};

export default Tags;
