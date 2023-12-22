import { useContext } from "react";
import { AuthContext } from "../../App";

const PastContest = ({ name, timeStamp }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="p-4 flex flex-row justify-between hover:bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
      <div>
        <h1 className="text-xl truncate font-bold">{name}</h1>
        <p className="text-base text-grey1">{timeStamp}</p>
      </div>
      {isLoggedIn && <button className="p-3 font-bold text-lg bg-accent1 transition-all duration-300 hover:bg-lightAccent1 text-white rounded-lg">Create Room</button>}
    </div>
  );
};

export default PastContest;
