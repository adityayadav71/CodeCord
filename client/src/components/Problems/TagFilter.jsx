import { React, useState } from "react";
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";

const TagFilter = ({ isTagsActive, activeTags, setActiveTags }) => {
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [companiesExpanded, setCompaniesExpanded] = useState(false);

  const toggleTopics = () => {
    setTopicsExpanded((prev) => !prev);
  };

  const toggleCompanies = () => {
    setCompaniesExpanded((prev) => !prev);
  };

  const activateTag = (event) => {
    const target = event.target.textContent;
    event.target.classList.remove("bg-accent2");
    event.target.classList.add("bg-accent1");
    const tag = (
      <div className="flex flex-row items-center gap-x-2 h-fit w-fit px-3 bg-accent4 rounded-xl">
        {target}
        <button>
          <FaRegTimesCircle />
        </button>
      </div>
    );
    const index = activeTags.filter((tag) => tag?.props?.children[0] == target);
    if (index.length === 0) {
      setActiveTags((prevTags) => [...prevTags, tag]);
    }
    if (index.length === 1) {
      const newActiveTags = activeTags.map((tag) => (tag?.props?.children[0] !== target ? tag : null));
      event.target.classList.remove("bg-accent1");
      event.target.classList.add("bg-accent2");
      setActiveTags(() => newActiveTags);
    }
  };

  return (
    <div
      className={`absolute transition-all duration-300 ${
        isTagsActive ? "opacity-1 z-[1] top-16" : "opacity-0 z-[-1] top-20"
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
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Arrays
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            HashTable
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Strings
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Dynamic Programming
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Math
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Recursion
          </p>
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
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Amazon
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Microsoft
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Apple
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Google
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Facebook
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Netflix
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Flipkart
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            Bloomberg
          </p>
          <p className="px-3 bg-accent2 hover:bg-accent1 rounded-xl" onClick={activateTag}>
            PayPal
          </p>
        </div>
      </div>
      <button className="ml-1 text-accent1" onClick={toggleCompanies}>
        {companiesExpanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default TagFilter;
