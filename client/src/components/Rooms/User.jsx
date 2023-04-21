import { RoomContext } from "../../layouts/AppLayout";
import { useContext } from "react";

const User = ({ name, imageURL, country }) => {
  const { roomData } = useContext(RoomContext);

  return (
    <div className="p-4 flex flex-row justify-between bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
      <div className="flex flex-row gap-x-3">
        <img
          src={imageURL}
          className="w-14 h-14 rounded-full hover:cursor-pointer"
          alt="profile-pic"
        />
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-base text-grey1">{country} | user rating</p>
        </div>
      </div>
      {roomData?.iAmHost && (
        <button className="p-3 font-bold text-lg bg-accent1 transition-all duration-300 hover:bg-lightAccent1 text-white rounded-xl">
          Remove
        </button>
      )}
    </div>
  );
};

export default User;
