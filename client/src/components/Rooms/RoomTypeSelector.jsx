const RoomTypeSelector = ({ roomType, setRoomType }) => {
  return (
    <div className="sm:col-span-2 col-span-3">
      <h1>Select Room Type</h1>
      <div className="flex flex-row justify-center items-center gap-3 bg-secondary p-3 rounded-lg">
        <button
          className={`px-3 w-full rounded-lg ${
            roomType === "Default" ? "bg-accent1 hover:bg-lightAccent1" : "hover:bg-lightSecondary"
          }`}
          onClick={() => setRoomType("Default")}
        >
          Default
        </button>
        <button
          className={`px-3 w-full rounded-lg ${
            roomType === "Contest" ? "bg-accent1 hover:bg-lightAccent1" : "hover:bg-lightSecondary"
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
