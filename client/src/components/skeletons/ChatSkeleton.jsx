const ChatSkeleton = (props) => {
  return (
    <div className="flex flex-col">
      <div className="w-36 h-6 rounded-md mb-2 bg-grey1 animate-pulse"></div>
      <div className="w-24 h-4 rounded-md bg-grey1 animate-pulse"></div>
    </div>
  );
};

export default ChatSkeleton;
