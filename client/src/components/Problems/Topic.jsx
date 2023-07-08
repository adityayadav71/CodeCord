import { Link } from "react-router-dom";

const Topic = ({ tagName, number }) => {
  return (
    <Link to={`/app/tag/${tagName}`} className="group h-fit hover:text-accent1 ">
      {tagName} <span className="group-hover:bg-grey3 bg-accent2 text-sm rounded-md px-2">{number}</span>
    </Link>
  );
};

export default Topic;
