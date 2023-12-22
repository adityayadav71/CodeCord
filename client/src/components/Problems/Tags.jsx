import { React } from "react";
import TagsFilter from "./TagsFilter";
import { FaAngleDown } from "react-icons/fa";

const Tags = ({ filterInsideModal, isTagsActive, setActiveFilters, activeTags, setActiveTags, handleClick }) => {
  return (
    <div className="dropdown relative" data-value="Tags">
      <div className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary sm:w-fit w-full p-3 hover:cursor-pointer outline-none rounded-lg" onClick={handleClick}>
        Tags
        <FaAngleDown className={`${isTagsActive ? "rotate-180" : ""} transition-all duration-300`} />
      </div>
      <TagsFilter filterInsideModal={filterInsideModal} setActiveFilters={setActiveFilters} activeTags={activeTags} setActiveTags={setActiveTags} isTagsActive={isTagsActive} />
    </div>
  );
};

export default Tags;
