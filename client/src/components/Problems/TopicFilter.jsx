import { useState, useEffect } from "react";
import Topic from "./Topic";
import { FaAngleDoubleDown } from "react-icons/fa";
import { getAllProblemTags } from "../../api/problemDataAPI";

const TopicFilter = (props) => {
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await getAllProblemTags("count,name");
      setTopics(response);
    };
    loadData();
  }, []);

  return (
    <div
      className={`relative flex flex-row flex-wrap items-start text-lg justify-start gap-3 ${
        tagsExpanded ? "h-fit" : "h-10"
      } overflow-y-hidden mb-3`}
    >
      {topics?.map((topic, i) => (
        <Topic key={i} tagName={topic.name} number={topic.count} />
      ))}
      <button
        className={`absolute flex flex-row items-center gap-x-3 px-3 ${
          tagsExpanded ? "right-0 bottom-0" : "right-0"
        } text-grey1 bg-primary`}
        onClick={() => setTagsExpanded((prev) => !prev)}
      >
        {tagsExpanded ? "Collapse" : "Expand"}
        <FaAngleDoubleDown className={`${tagsExpanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
};

export default TopicFilter;
