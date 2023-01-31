import React from "react";

const TagButton = ({ tagName, activateTag }) => {
  return (
    <p className={`px-3 ${activateTag ? "bg-accent2" : "bg-accent1"} rounded-xl`} onClick={activateTag}>
      {tagName}
    </p>
  );
};

export default TagButton;
