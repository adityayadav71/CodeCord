import { FaRegTimesCircle } from "react-icons/fa";

const Scoreboard = ({ setOpenScoreboard }) => {
  return (
    <div className="absolute z-[9999] h-[95%] w-[80%] p-12 shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Scoreboard</h1>
        <FaRegTimesCircle
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => setOpenScoreboard(false)}
        />
      </div>
      <div className="grid auto-rows-auto grid-cols-12 gap-3 items-center justify-items-center">
        <p className="border-b border-grey1">Rank</p>
        <p className="col-span-2 justify-self-start">Username</p>
        <div className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
          <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">
            1
          </p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            Two Sumasassasassdfgsdgdsgsdgsda
          </p>
        </div>
        <div className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
          <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">
            2
          </p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            Two Sumasassasassdfgsdgdsgsdgsda
          </p>
        </div>
        <div className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
          <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">
            3
          </p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            Two Sumasassasassdfgsdgdsgsdgsda
          </p>
        </div>
        <div className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
          <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">
            4
          </p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            Two Sumasassasassdfgsdgdsgsdgsda
          </p>
        </div>
        <p>Score</p>
        <p className="bg-green w-8 h-8 rounded-lg text-center">1</p>
        <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
          <img className="w-8 h-8 rounded-lg overflow-hidden" src="" alt="" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">
            adityayadav716976716976
          </p>
        </div>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="text-xl text-center font-bold">100</p>
        <p className="bg-mediumYellow w-8 h-8 rounded-lg text-center">2</p>
        <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
          <img className="w-8 h-8 rounded-lg overflow-hidden" src="" alt="" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">
            hrishitiwari19
          </p>
        </div>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="text-xl text-center font-bold">100</p>
        <p className="bg-accent1 w-8 h-8 rounded-lg text-center">3</p>
        <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
          <img className="w-8 h-8 rounded-lg overflow-hidden" src="" alt="" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">
            princeyadav19
          </p>
        </div>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="text-xl text-center font-bold">90</p>
        <p className="border border-white w-8 h-8 rounded-lg text-center">4</p>
        <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
          <img className="w-8 h-8 rounded-lg overflow-hidden" src="" alt="" />
          <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">
            mrankit112
          </p>
        </div>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="col-span-2 text-lg text-center">03:45</p>
        <p className="text-xl text-center font-bold">80</p>
      </div>
    </div>
  );
};

export default Scoreboard;
