const TestCaseLoadingSkeleton = () => {
  const pulse = "animate-pulse bg-grey1 rounded-md";
  return (
    <div className="h-[300px] py-3 px-4 overflow-y-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className={`${pulse} w-24 h-8`}></div>
        <div className={`${pulse} w-24 h-8`}></div>
      </div>
      <div className={`${pulse} w-20 h-6 mb-2`}></div>
      <div className={`${pulse} h-12 w-full mb-3`}></div>
      <div className={`${pulse} w-20 h-6 mb-2`}></div>
      <div className={`${pulse} h-12 w-full`}></div>
    </div>
  );
};

export default TestCaseLoadingSkeleton;
