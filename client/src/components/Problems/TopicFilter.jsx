import { React, useState } from "react";
import Topic from "./Topic";
import { FaAngleDoubleDown } from "react-icons/fa";

const TopicFilter = (props) => {
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const toggleTags = () => {
    setTagsExpanded((prev) => !prev);
  };
  return (
    <div className={`relative flex flex-row flex-wrap items-start justify-start gap-x-3 gap-y-3 max-w-[723px] ${tagsExpanded ? "h-fit" : "h-10"} overflow-y-hidden mb-3`}>
      <Topic tagName="Arrays" number="553" />
      <Topic tagName="Strings" number="645" />
      <Topic tagName="Dynamic Programming" number="323" />
      <Topic tagName="Math" number="303" />
      <Topic tagName="Sorting" number="210" />
      <Topic tagName="Greedy" number="120" />
      <Topic tagName="Depth-First Search" number="87" />
      <Topic tagName="Database" number="45" />
      <Topic tagName="Breadth-First Search" number="98" />
      <Topic tagName="Binary Search" number="334" />
      <Topic tagName="Tree" number="454" />
      <Topic tagName="Matrix" number="543" />
      <button className={`absolute flex flex-row items-center gap-x-3 px-3 ${tagsExpanded ? "right-0 bottom-0" : "right-0"} text-grey1 bg-primary`} onClick={toggleTags}>
        {tagsExpanded ? "Collapse" : "Expand"}
        <FaAngleDoubleDown className={`${tagsExpanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
};

export default TopicFilter;
