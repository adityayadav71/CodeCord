import { React } from "react";
import TagsFilter from "./TagsFilter";
import { FaAngleDown, FaHandPointer } from "react-icons/fa";

const Tags = ({ isTagsActive, activeTags, setActiveTags, handleClick, disableEvents }) => {
  return (
    <div className="dropdown relative" data-value="Tags">
      <div
        className={`${
          disableEvents && "pointer-events-none bg-lightSecondary"
        } flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary w-fit p-3 hover:cursor-pointer outline-none rounded-lg`}
        onClick={handleClick}
      >
        Tags
        {isTagsActive ? <FaAngleDown className="rotate-180 transition-all duration-300" /> : <FaAngleDown className="transition-all duration-300" />}
        {disableEvents && <FaHandPointer className="absolute bottom-0 left-16" />}
      </div>
      <TagsFilter disableEvents={disableEvents} activeTags={activeTags} setActiveTags={setActiveTags} isTagsActive={isTagsActive} />
    </div>
  );
};

export default Tags;
