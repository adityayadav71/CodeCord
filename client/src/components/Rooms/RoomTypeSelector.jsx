import React from "react";

const RoomTypeSelector = ({ roomType, setRoomType }) => {
  return (
    <div>
      <h1>Select Room Type</h1>
      <div className="flex flex-row justify-center items-center bg-secondary p-3 rounded-lg">
        <button
          className={`px-3 w-full rounded-lg ${
            roomType === "Default" ? "bg-accent1" : ""
          }`}
          onClick={() => setRoomType("Default")}
        >
          Default
        </button>
        <button
          className={`px-3 w-full rounded-lg ${
            roomType === "Contest" ? "bg-accent1" : ""
          }`}
          onClick={() => setRoomType("Contest")}
        >
          Contest
        </button>
      </div>
    </div>
  );
};

export default RoomTypeSelector;
