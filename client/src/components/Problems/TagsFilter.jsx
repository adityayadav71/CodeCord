import { React, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TagButton from "./TagButton";
import { getAllProblemTags } from "../../api/problemDataAPI";

const TagsFilter = ({
  isTagsActive,
  setActiveFilters,
  activeTags,
  setActiveTags,
  disableEvents,
}) => {
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [companiesExpanded, setCompaniesExpanded] = useState(false);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const reset = (event) => {
      if (!event.target.closest(".TagsFilter")) {
        setTimeout(() => {
          setTopicsExpanded(false);
          setCompaniesExpanded(false);
        }, 1000);
      }
    };
    document.addEventListener("click", reset);
    return () => {
      document.removeEventListener("click", reset);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const response = await getAllProblemTags("name");
      setTags(response);
    };
    loadData();
  }, []);

  return (
    <div
      className={`TagsFilter ${
        disableEvents ? "pointer-events-none" : ""
      } absolute transition-all duration-300 ${
        isTagsActive ? "opacity-1 z-20 top-16" : "opacity-0 -z-10 top-20"
      } shadow shadow-dropDown left-0 p-3 h-fit w-96 hover:cursor-pointer bg-secondary rounded-xl`}
    >
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="bg-accent4 drop-shadow-lg rounded-full h-fit px-4">
            Topics
          </div>
          <div className="relative flex flex-row items-center drop-shadow-lg">
            <FaSearch className="absolute left-2" />
            <input
              className="h-fit w-fit pl-8 rounded-lg bg-accent4 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-accent1"
              type="text"
              placeholder="Filter topics and companies"
            />
          </div>
        </div>
        <div
          className={`flex flex-row flex-wrap content-start justify-start w-full gap-3 mb-3 ${
            topicsExpanded ? "h-52 overflow-y-scroll" : "h-20 overflow-y-hidden"
          }`}
        >
          {tags?.map((tag, i) => (
            <TagButton
              key={i}
              tagName={tag.name}
              setActiveFilters={setActiveFilters}
              activeTags={activeTags}
              setActiveTags={setActiveTags}
            />
          ))}
        </div>
      </div>
      <button
        className="ml-1 mb-3 text-accent1"
        onClick={() => setTopicsExpanded((prev) => !prev)}
      >
        {topicsExpanded ? "Collapse" : "Expand"}
      </button>
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center">
          <div className="bg-accent4 drop-shadow-lg rounded-full px-4">
            Companies
          </div>
        </div>
        <div
          className={`flex flex-row flex-wrap content-start justify-start w-full gap-3 mb-3 ${
            companiesExpanded
              ? "h-52 overflow-y-scroll"
              : "h-20 overflow-y-hidden"
          }`}
        >
          <TagButton
            tagName="Amazon"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Microsoft"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Google"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Facebook"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Netflix"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Flipkart"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Bloomberg"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <TagButton
            tagName="Paypal"
            setActiveFilters={setActiveFilters}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
        </div>
      </div>
      <button
        className="ml-1 text-accent1"
        onClick={() => setCompaniesExpanded((prev) => !prev)}
      >
        {companiesExpanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default TagsFilter;
