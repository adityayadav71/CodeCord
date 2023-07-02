import { FaUserFriends as UserIcon } from "react-icons/fa";
import {
  HiChevronLeft as LeftIcon,
  HiChevronRight as RightIcon,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const DescriptionSkeleton = ({ isRoom, isParticipantList }) => {
  return isParticipantList ? (
    <div className="flex flex-col gap-3 px-3 py-6 rounded-xl grow">
      <div className="flex flex-row items-center">
        <div className="flex-col">
          <div className="animate-pulse bg-grey1 w-80 h-8 rounded-md mb-3"></div>
          <div className="animate-pulse bg-grey1 rounded-md text-base w-32 h-6 mb-3"></div>
        </div>
        <button className="switch p-2 text-2xl ml-auto rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300">
          <IoClose />
        </button>
      </div>
      <div className="p-4 flex flex-row items-center justify-between bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
        <div className="flex flex-row gap-x-3">
          <div className="animate-pulse bg-grey1 w-14 h-14 rounded-full"></div>
          <div>
            <div className="animate-pulse bg-grey1 w-32 h-6 rounded-md mb-2"></div>
            <div className="animate-pulse bg-grey1 w-20 h-6 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-row items-center justify-between bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
        <div className="flex flex-row gap-x-3">
          <div className="animate-pulse bg-grey1 w-14 h-14 rounded-full"></div>
          <div>
            <div className="animate-pulse bg-grey1 w-32 h-6 rounded-md mb-2"></div>
            <div className="animate-pulse bg-grey1 w-20 h-6 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col grow px-3 pt-6">
      <div className="flex flex-row justify-between items-center mb-3">
        <div>
          <div className="animate-pulse bg-grey1 rounded-md w-96 h-10 mb-3"></div>
          {isRoom && (
            <div className="animate-pulse bg-grey1 rounded-md w-48 h-6"></div>
          )}
        </div>
        {isRoom && (
          <div className="flex items-center gap-x-3">
            <button className="switch p-2 text-2xl rounded-md bg-grey3 hover:bg-accent1 transition-all duration-300">
              <UserIcon />
            </button>
            <button className="switch p-2 text-2xl rounded-md bg-grey3 hover:bg-accent1 transition-all duration-300">
              <LeftIcon />
            </button>
            <button className="switch p-2 text-2xl rounded-md bg-grey3 hover:bg-accent1 transition-all duration-300">
              <RightIcon />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-x-5 mb-6">
        <div className={"animate-pulse bg-grey1 w-24 h-8 rounded-md"}></div>
        <div className="flex flex-row gap-x-1 items-center">
          <div className="animate-pulse bg-grey1 w-14 h-6 rounded-md"></div>
        </div>
        <div className="flex flex-row gap-x-1 items-center">
          <div className="animate-pulse bg-grey1 w-14 h-6 rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-6 text-lg">
        <div className="animate-pulse bg-grey1 rounded-md h-6 w-full"></div>
        <div className="animate-pulse bg-grey1 rounded-md h-6 w-full"></div>
        <div className="animate-pulse bg-grey1 rounded-md h-6 w-full"></div>
      </div>
      <code className="mb-6">
        <h1 className="animate-pulse bg-grey1 rounded-md w-14 h-6 mb-3"></h1>
        <div className="mb-4 px-3 py-2 rounded-md bg-lightAccent3">
          <div className="flex items-center gap-3">
            <span className="font-bold">Input:</span>
            <div className="animate-pulse bg-grey1 rounded-md w-32 h-6"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Output:</span>
            <div className="animate-pulse bg-grey1 rounded-md w-32 h-6"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Explanation: </span>
            <div className="animate-pulse bg-grey1 rounded-md w-full h-6"></div>
          </div>
        </div>
      </code>
      <code className="mb-6">
        <h1 className="animate-pulse bg-grey1 rounded-md w-14 h-6 mb-3"></h1>
        <div className="mb-4 px-3 py-2 rounded-md bg-lightAccent3">
          <div className="flex items-center gap-3">
            <span className="font-bold">Input:</span>
            <div className="animate-pulse bg-grey1 rounded-md w-32 h-6"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Output:</span>
            <div className="animate-pulse bg-grey1 rounded-md w-32 h-6"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Explanation: </span>
            <div className="animate-pulse bg-grey1 rounded-md w-full h-6"></div>
          </div>
        </div>
      </code>
      <div className="mb-6">
        <h1 className="mb-3 font-bold">Constraints:</h1>
        <div className="flex flex-col gap-1 px-3 py-2">
          <div className="animate-pulse bg-grey1 w-80 h-6 rounded-md"></div>
          <div className="animate-pulse bg-grey1 w-80 h-6 rounded-md"></div>
          <div className="animate-pulse bg-grey1 w-80 h-6 rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-x-5 mt-12 mb-12">
        <div className="flex flex-row items-center gap-x-3">
          <p className="text-grey1 text-base">Accepted</p>
          <div className="animate-pulse bg-grey1 w-14 h-8 rounded-md"></div>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <p className="text-grey1 text-base">Submissions</p>
          <div className="animate-pulse bg-grey1 w-14 h-8 rounded-md"></div>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <p className="text-grey1 text-base">Acceptance</p>
          <div className="animate-pulse bg-grey1 w-14 h-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSkeleton;
