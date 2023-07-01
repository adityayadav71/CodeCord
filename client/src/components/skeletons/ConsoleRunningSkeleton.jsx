const ConsoleRunningSkeleton = () => {
  const pulse = "animate-pulse bg-grey1 rounded-lg";
  return (
    <div className="flex flex-col gap-3">
      <div className={`${pulse} w-40 h-8 mb-4`}></div>
      <div className="flex items-center gap-3 mb-1">
        <div className={`${pulse} w-24 h-7`}></div>
        <div className={`${pulse} w-24 h-7`}></div>
      </div>
      <div className={`${pulse} w-20 h-6 mb-1`}></div>
      <div className={`${pulse} h-10 w-full mb-3`}></div>
      <div className={`${pulse} w-20 h-6 mb-1`}></div>
      <div className={`${pulse} h-10 w-full`}></div>
    </div>
  );
};

export default ConsoleRunningSkeleton;
