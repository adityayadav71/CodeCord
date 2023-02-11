import { IoCopy } from "react-icons/io5";

const RoomInviteLink = (props) => {
  return (
    <div>
      <h1>Copy Invite Link</h1>
      <div className="relative">
        <button className="absolute flex items-center justify-center right-0 w-1/5 h-full bg-accent1 p-3 rounded-lg">
          <IoCopy className="text-lg" />
        </button>
        <input
          className="w-full ring-2 ring-inset ring-accent1 bg-secondary p-3 focus:outline-none rounded-lg"
          type="text"
          placeholder="Invite link"
        />
      </div>
    </div>
  );
};

export default RoomInviteLink;
