import { React, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TagButton from "./TagButton";

const AllTags = ({ isTagsActive, activeTags, setActiveTags }) => {
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [companiesExpanded, setCompaniesExpanded] = useState(false);

  useEffect(() => {
    const reset = (event) => {
      if (!event.target.closest(".allTags")) {
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

  const toggleTopics = () => {
    setTopicsExpanded((prev) => !prev);
  };

  const toggleCompanies = () => {
    setCompaniesExpanded((prev) => !prev);
  };

  return (
    <div
      className={`allTags absolute transition-all duration-300 ${
        isTagsActive ? "opacity-1 z-20 top-16" : "opacity-0 -z-10 top-20"
      } shadow shadow-dropDown left-0 p-3 h-fit w-96 hover:cursor-pointer bg-secondary rounded-xl`}
    >
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="bg-accent4 shadow shadow-heading rounded-2xl h-fit px-4">Topics</div>
          <div className="relative flex flex-row items-center">
            <FaSearch className="absolute left-2" />
            <input
              className="h-fit w-fit pl-8 shadow shadow-heading rounded-lg bg-accent4 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-accent1"
              type="text"
              placeholder="Filter topics and companies"
            />
          </div>
        </div>
        <div className={`flex flex-row flex-wrap content-start justify-start w-full gap-3 mb-3 ${topicsExpanded ? "h-52 overflow-y-scroll" : "h-20 overflow-y-hidden"}`}>
          <TagButton tagName="Arrays" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="HashTable" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Strings" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Dynamic Programming" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Math" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Recursion" activeTags={activeTags} setActiveTags={setActiveTags} />
        </div>
      </div>
      <button className="ml-1 mb-3 text-accent1" onClick={toggleTopics}>
        {topicsExpanded ? "Collapse" : "Expand"}
      </button>
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center">
          <div className="bg-accent4 shadow shadow-heading rounded-2xl px-4">Companies</div>
        </div>
        <div className={`flex flex-row flex-wrap content-start justify-start w-full gap-3 mb-3 ${companiesExpanded ? "h-52 overflow-y-scroll" : "h-20 overflow-y-hidden"}`}>
          <TagButton tagName="Amazon" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Microsoft" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Google" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Facebook" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Netflix" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Flipkart" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Bloomberg" activeTags={activeTags} setActiveTags={setActiveTags} />
          <TagButton tagName="Paypal" activeTags={activeTags} setActiveTags={setActiveTags} />
        </div>
      </div>
      <button className="ml-1 text-accent1" onClick={toggleCompanies}>
        {companiesExpanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default AllTags;
