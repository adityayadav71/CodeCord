import React from "react";

const Topic = ({ tagName, number }) => {
  return (
    <button className="group h-fit hover:text-accent1 ">
      {tagName} <span className="group-hover:bg-grey3 bg-accent2 text-sm rounded-md px-1">{number}</span>
    </button>
  );
};

export default Topic;
