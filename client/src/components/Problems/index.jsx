import LiveRooms from "../Rooms/LiveRooms";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import TopicFilter from "./TopicFilter";
import ProblemFilter from "./ProblemFilter";
import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext(null);

const Problems = (props) => {
  const [filterObj, setFilterObj] = useState({
    tags: [],
    page: 1,
    limit: 20,
    totalPages: 1,
    difficulty: "",
    sort: "",
  });
  
  return (
    <FilterContext.Provider value={{ filterObj, setFilterObj }}>
      <div className="grid grid-cols-4 w-full px-6 py-4 gap-x-6">
        <div className="col-span-3 flex flex-col">
          <TopicFilter />
          <ProblemFilter filterInsideModal={false} />
          <ProblemList filterInsideModal={false} />
          <Pagination filterInsideModal={false} />
        </div>
        <LiveRooms className="col-span-1" />
      </div>
    </FilterContext.Provider>
  );
};

export default Problems;
