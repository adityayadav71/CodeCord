import { FaCog, FaPlus, FaUndo } from "react-icons/fa";

const Console = (props) => {
  return (
    <div className="flex flex-col justify-content-end h-full p-3">
      <div className="flex flex-row justify-between items-center border-b border-lightSecondary">
        <div>
          <button className="w-28 p-3 border-b-2 border-accent1">Testcase</button>
          <button className="w-28 p-3 text-grey1 hover:text-white">Result</button>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <FaUndo className="text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"/>
          <FaCog className="text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"/>
        </div>
      </div>
      <div className="grow flex flex-col py-3 px-4 overflow-y-scroll">
        <div className="flex flex-row items-center gap-x-3 mb-3">
          <div className="px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">Case 1</div>
          <div className="px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">Case 2</div>
          <div className="px-3 rounded-lg bg-primary hover:bg-lightPrimary hover:cursor-pointer w-fit">Case 3</div>
          <FaPlus className="text-grey1" />
        </div>
        <div className="w-full mb-3">
          <p className="mb-2">Input 1 = </p>
          <input type="text" className="w-full px-3 py-2 bg-lightPrimary rounded-lg focus:outline-none border-none" />
        </div>
        <div className="w-full">
          <p className="mb-2">Input 2 = </p>
          <input type="text" className="w-full px-3 py-2 bg-lightPrimary rounded-lg focus:outline-none border-none" />
        </div>
      </div>
    </div>
  );
};

export default Console;
