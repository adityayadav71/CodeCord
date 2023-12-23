const TopicListSkeleton = (props) => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push(
      <div key={i} className="odd:bg-hover">
        <div className="flex flex-row items-center p-3 text-lg">
          <div className="w-20">
            <div className="w-6 h-6 rounded-full bg-grey1 animate-pulse"></div>
          </div>
          <div className="grow">
            <div className="w-96 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-40">
            <div className="w-10 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-40">
            <div className="w-20 h-6 rounded-md bg-grey1 animate-pulse"></div>
          </div>
          <div className="w-40">
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
    <>
    <div className="h-16 w-56 bg-grey1 rounded-md animate-pulse ml-48 mt-12"></div>
    <div className="flex flex-col bg-secondary rounded-xl mx-48 mt-6">
      <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
        <p className="w-20">Status</p>
        <div className="header group flex flex-row grow items-center justify-between hover:cursor-pointer">
          <p>Title</p>
        </div>
        <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
          <p>Acceptance</p>
        </div>
        <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
          <p>Difficulty</p>
        </div>
        <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
          <p>Submissions</p>
        </div>
        <div className="w-40">Your Submissions</div>
      </div>
      {problems}
    </div>
    </>
  );
};

export default TopicListSkeleton;