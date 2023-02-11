import { FaUsers, FaGlobeAsia } from "react-icons/fa";

const RoomVisibility = ({ visibility, setVisibility }) => {
  return (
    <div className="flex flex-row gap-x-3">
      <FaUsers
        className={`text-3xl p-1 ${
          visibility === "private" ? "bg-accent1" : "bg-secondary"
        }  hover:cursor-pointer rounded-lg`}
        onClick={() => {
          setVisibility("private");
        }}
      />
      <FaGlobeAsia
        className={`text-3xl p-1 ${
          visibility === "public" ? "bg-accent1" : "bg-secondary"
        } hover:cursor-pointer rounded-lg`}
        onClick={() => {
          setVisibility("public");
        }}
      />
    </div>
  );
};

export default RoomVisibility;
