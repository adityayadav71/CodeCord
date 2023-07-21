import { IoCopy } from "react-icons/io5";
import { useState } from "react";
import Skeleton from "../skeletons/RoomInviteLinkSkeleton";

const RoomInviteLink = ({ isLoading, inviteLink }) => {
  const [message, setMessage] = useState();
  const handleCopy = () => {
    const copyText = document.getElementById("invite");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    setMessage("Copied to Clipboard!");
  };
  return (
    <div>
      <div className="flex items-center w-full">
        <h1>Copy Invite Code</h1>
        <p className="text-green-500 text-sm font-bold ml-auto">{message}</p>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="relative">
          <button
            className="absolute flex items-center justify-center right-0 w-1/5 h-full active:scale-90 hover:bg-lightAccent1 bg-accent1 p-3 rounded-lg"
            onClick={handleCopy}
          >
            <IoCopy className="text-lg" />
          </button>
          <input
            id="invite"
            className="w-full ring-2 pr-16 ring-inset ring-accent1 bg-secondary p-3 focus:outline-none rounded-lg"
            type="text"
            value={inviteLink}
            onChange={() => {}}
            placeholder="Invite Code"
          />
        </div>
      )}
    </div>
  );
};

export default RoomInviteLink;
