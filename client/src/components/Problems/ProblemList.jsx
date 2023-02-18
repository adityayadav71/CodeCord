import { useContext } from "react";
import { AuthContext } from "../../App";
import Problem from "./Problem";

const ProblemList = ({type}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex flex-col bg-secondary rounded-xl mb-3 grow overflow-clip">
      <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
        <div className="w-20">Status</div>
        <div className="grow">Title</div>
        <div className="w-40">Acceptance</div>
        <div className="w-40">Difficulty</div>
        <div className="w-40">Submissions</div>
        {isLoggedIn && type !== "select" && <div className="w-40">Your Submissions</div>}
        {type === "select" && <div className="w-20">Selected</div>}
      </div>
      <Problem number="1" type={type} name="Two Sum" acceptance="49.4" difficulty="easy" userSubmissions="1" submissions="18M" status="solved" />
      <Problem number="2" type={type} name="Add Two Numbers" acceptance="40.1" difficulty="medium" userSubmissions="2" submissions="2M" status="attempted" />
      <Problem number="3" type={type} name="Median of Two Sorted Arrays" acceptance="35.8" difficulty="hard" userSubmissions="7" submissions="232K" status="solved" />
      <Problem number="4" type={type} name="Check Palindrome" acceptance="35.8" difficulty="easy" userSubmissions="0" submissions="76.3K" status="" />
      <Problem number="5" type={type} name="ZigZag Conversion" acceptance="43.5" difficulty="medium" userSubmissions="3" submissions="12M" status="solved" />
      <Problem number="6" type={type} name="Integer to Roman" acceptance="61.8" difficulty="medium" userSubmissions="1" submissions="1M" status="solved" />
      <Problem number="7" type={type} name="3Sum" acceptance="32.4" difficulty="medium" userSubmissions="4" submissions="929K" status="attempted" />
    </div>
  );
};

export default ProblemList;
