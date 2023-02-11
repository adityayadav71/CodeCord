import LiveRooms from "../Rooms/LiveRooms";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import TopicFilter from "./TopicFilter";
import ProblemFilter from "./ProblemFilter";

const Problems = (props) => {
  return (
    <div className="flex flex-row w-full px-6 py-4 gap-x-6 grow">
      <div className="flex flex-col grow">
        <TopicFilter />
        <ProblemFilter filterInsideModal={false}/>
        <ProblemList type=""/>
        <Pagination />
      </div>
      <LiveRooms />
    </div>
  );
};

export default Problems;
