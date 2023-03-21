import { useState, useEffect } from "react";
import { FaCog, FaCompress, FaExpand, FaPlus, FaUndo } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Console = ({ handleSettings, clearEditor }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  useEffect(() => {
    if (isFullScreen) {
      document.querySelector(".editor").requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  return (
    <div className="relative flex flex-col justify-content-end h-full p-3 overflow-hidden">
      <div className="flex flex-row justify-between items-center border-b border-lightSecondary">
        <div>
          <button className="w-28 p-3 border-b-2 border-accent1">Testcase</button>
          <button className="w-28 p-3 text-grey1 hover:text-white">Result</button>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <div className="relative group">
            <FaUndo className="text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={clearEditor} />
            <div className="absolute group-hover:block hidden top-8 -left-6 px-3 py-1 bg-grey1 text-primary rounded-lg">Reset</div>
          </div>
          <div className="relative group">
            <FaCog className="settings text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleSettings} />
            <div className="absolute group-hover:block hidden top-8 -left-8 px-3 py-1 bg-grey1 text-primary rounded-lg">Settings</div>
          </div>
          <div className="relative group">
            {isFullScreen ? (
              <>
                <FaCompress className="text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                <div className="absolute group-hover:block hidden top-8 right-0 px-3 py-1 bg-grey1 text-primary rounded-lg">Minimize</div>
              </>
            ) : (
              <>
                <FaExpand className="text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                <div className="absolute group-hover:block hidden top-8 right-0 px-3 py-1 bg-grey1 text-primary rounded-lg">FullScreen</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="grow flex flex-col py-3 px-4 overflow-y-scroll">
        <div className="flex flex-row items-center gap-x-3 mb-3">
          <div className="group relative px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">
            <div className="group-hover:flex flex-row items-center justify-center hidden absolute -top-1.5 -right-1.5 rounded-full bg-primary shadow w-5 h-5">
              <ImCross className="text-[0.5rem]" />
            </div>
            Case 1
          </div>
          <div className="group relative px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">
            <div className="group-hover:flex flex-row items-center justify-center hidden absolute -top-1.5 -right-1.5 rounded-full bg-primary shadow w-5 h-5">
              <ImCross className="text-[0.5rem]" />
            </div>
            Case 2
          </div>
          <div className="group relative px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">
            <div className="group-hover:flex flex-row items-center justify-center hidden absolute -top-1.5 -right-1.5 rounded-full bg-primary shadow w-5 h-5">
              <ImCross className="text-[0.5rem]" />
            </div>
            Case 3
          </div>
          <FaPlus className="text-grey1" />
        </div>
        <div className="w-full mb-3">
          <p className="mb-2">Input 1 = </p>
          <input type="text" className="w-full px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none" />
        </div>
        <div className="w-full">
          <p className="mb-2">Input 2 = </p>
          <input type="text" className="w-full px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none" />
        </div>
      </div>
    </div>
  );
};

export default Console;
