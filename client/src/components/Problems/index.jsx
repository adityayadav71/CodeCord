import LiveRooms from "../Rooms/LiveRooms";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import TopicFilter from "./TopicFilter";
import ProblemFilter from "./ProblemFilter";
import { createContext, useState } from "react";

export const FilterContext = createContext(null);

const Problems = (props) => {
  const [filterObj, setFilterObj] = useState({
    tags: [],
    page: 1,
    limit: 20,
    totalPages: 1,
    difficulty: "",
    sort: ""
  });
  return (
    <FilterContext.Provider value={{ filterObj, setFilterObj }}>
      <div className="flex flex-row w-full px-6 py-4 gap-x-6 grow">
        <div className="flex flex-col grow">
          <TopicFilter />
          <ProblemFilter filterInsideModal={false} />
          <ProblemList type="" />
          <Pagination />
        </div>
        <LiveRooms />
      </div>
    </FilterContext.Provider>
  );
};

export default Problems;
