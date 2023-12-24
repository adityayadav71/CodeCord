const ProblemListSkeleton = (props) => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push(
      <div key={i} className="odd:bg-hover">
        <div className="flex flex-row items-center p-3 text-lg">
          <div className="w-20">
            <div className="w-6 h-6 rounded-full bg-grey1 animate-pulse"></div>
          </div>
          <div className="grow min-w-[18rem]">
            <div className="w-96 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-32">
            <div className="w-10 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-32">
            <div className="w-20 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-32">
            <div className="w-10 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-40">
            <div className="w-6 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-secondary rounded-lg w-full">
      {problems}
    </div>
  );
};

export default ProblemListSkeleton;
