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
    limit: 30,
    difficulty: "",
    sort: "",
  });
  const [totalPages, setTotalPages] = useState(1);

  return (
    <FilterContext.Provider value={{ filterObj, setFilterObj }}>
      <div className="flex grow md:flex-row flex-col max-w-full px-6 py-4 gap-6">
        <div className="flex flex-col md:grow md:w-1/2">
          <TopicFilter />
          <ProblemFilter filterInsideModal={false} />
          <div className="flex grow overflow-y-hidden hideScrollbar rounded-lg mb-3">
            <ProblemList setTotalPages={setTotalPages} filterInsideModal={false} />
          </div>
          <Pagination totalPages={totalPages} filterInsideModal={false} />
        </div>
        <LiveRooms />
      </div>
    </FilterContext.Provider>
  );
};

export default Problems;
