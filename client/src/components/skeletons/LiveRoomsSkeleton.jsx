const LiveRoomsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="animate-pulse bg-grey1 rounded-lg grid h-24 w-full last:mb-24"></div>
      <div className="animate-pulse bg-grey1 rounded-lg grid h-24 w-full last:mb-24"></div>
    </div>
  );
};

export default LiveRoomsSkeleton;
