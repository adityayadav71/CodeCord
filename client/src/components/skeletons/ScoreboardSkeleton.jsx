import { Fragment } from "react";
const ScoreboardSkeleton = (props) => {
  const placeholder = [1, 2, 3, 4];

  return (
    <div className="grid auto-rows-auto grid-cols-12 gap-3 p-3 items-center justify-items-center">
      <p className="text-lg font-semibold">Rank</p>
      <p className="col-span-2 text-lg font-semibold justify-self-start">Username</p>
      {placeholder.map((_, i) => (
        <div key={i + 1} className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
          <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">{i + 1}</p>
          <p className="animate-pulse bg-grey1 w-28 h-8 rounded-md"></p>
        </div>
      ))}
      <p className="text-lg font-semibold">Score</p>
      {placeholder.map((_, i) => (
        <Fragment key={i}>
          <p className={`${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : i === 2 ? "bg-amber-800" : "border border-white"} w-8 h-8 rounded-lg text-center`}>{i + 1}</p>
          <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
            <div className="w-8 h-8 rounded-full bg-grey1 animate-pulse drop-shadow-lg overflow-hidden"></div>
            <p className="w-32 h-8 animate-pulse bg-grey1 rounded-md text-ellipsis overflow-hidden whitespace-nowrap text-center"></p>
          </div>
          <p className="w-14 h-8 rounded-md bg-grey1 animate-pulse col-span-2"></p>
          <p className="w-14 h-8 rounded-md bg-grey1 animate-pulse col-span-2"></p>
          <p className="w-14 h-8 rounded-md bg-grey1 animate-pulse col-span-2"></p>
          <p className="w-14 h-8 rounded-md bg-grey1 animate-pulse col-span-2"></p>
          <p className="w-14 h-8 rounded-md bg-grey1 animate-pulse"></p>
        </Fragment>
      ))}
    </div>
  );
};

export default ScoreboardSkeleton;
