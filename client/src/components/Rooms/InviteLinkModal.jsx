import RoomInviteLink from "./RoomInviteLink";

const InviteLinkModal = ({ inviteLinkModal, inviteCode }) => {
  return (
    <div
      className={`modal absolute top-16 right-0 w-96 h-42 overflow-y-scroll px-4 py-3 drop-shadow-xl rounded-xl transition duration-300 bg-secondary ${
        inviteLinkModal ? "" : "hidden"
      }`}
    >
      <div className="mb-3">
        <RoomInviteLink inviteLink={inviteCode} />
      </div>
    </div>
  );
};

export default InviteLinkModal;
