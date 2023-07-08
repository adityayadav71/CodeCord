import { useState, useEffect } from "react";

const TagButton = ({
  tagName,
  setActiveFilters,
  activeTags,
  setActiveTags,
}) => {
  useEffect(() => {
    // Disable active tag when deactivated from filter list
    !activeTags.includes(tagName) && setIsActive(false);
  }, [activeTags]);

  const [isActive, setIsActive] = useState(false);

  const activateTag = (event) => {
    const target = event.target.textContent;

    setActiveFilters((prevFilter) =>
      prevFilter?.topics?.includes(target)
        ? {
            ...prevFilter,
            topics: prevFilter.topics.filter((topic) => topic !== target),
          }
        : {
            ...prevFilter,
            topics: [...prevFilter.topics, target],
          }
    );
    setIsActive((prev) => !prev);

    const index = activeTags.filter((tag) => tag === target);

    if (index.length === 0) {
      setActiveTags((prevTags) => [...prevTags, target]);
    }
    if (index.length === 1) {
      event.target.classList.add("bg-accent2");
      event.target.classList.remove("bg-accent1");
      setActiveTags((prevTags) => prevTags.filter((tag) => tag !== target));
    }
  };

  return (
    <p
      className={`px-3 ${isActive ? "bg-accent1" : "bg-accent2"} rounded-xl`}
      onClick={activateTag}
    >
      {tagName}
    </p>
  );
};

export default TagButton;
