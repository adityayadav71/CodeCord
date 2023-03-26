import { useState, useEffect, useContext, Fragment } from "react";
import { ProblemContext } from "./index";
import { FaCog, FaCompress, FaExpand, FaPlus, FaUndo } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { nanoid } from "nanoid";

const Console = ({ handleSettings, clearEditor }) => {
  const { activeProblem } = useContext(ProblemContext);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [testcases, setTestcases] = useState([]);
  const [currentTestCase, setCurrentTestCase] = useState({});
  const [outputReceived, setOutputReceived] = useState(false);
  const [activeTab, setActiveTab] = useState("Testcase");

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleActiveTestCase = (e) => {
    const active = parseInt(e.target.dataset.key);
    setCurrentTestCase(testcases[active]);
  };

  const handleAddTestCase = () => {
    const length = testcases.length;
    if (length < 6) {
      setTestcases((prevCases) => {
        const newCase = {
          id: nanoid(),
          input: new Array(prevCases[0].input.length).fill(""),
          expected: "",
        };
        setCurrentTestCase(newCase);
        return [...prevCases, newCase];
      });
    }
  };

  const handleRemoveTestCase = (e) => {
    e.stopPropagation();
    const toBeDeleted = parseInt(e.target.closest(".cross").dataset.key);
    setTestcases((prevCases) => {
      const filteredCases = prevCases.filter((_, i) => i !== toBeDeleted);
      const activeIndex = prevCases.findIndex(
        (tc) => tc.id === currentTestCase.id
      );
      let active =
        toBeDeleted <= activeIndex && activeIndex > 0
          ? activeIndex - 1
          : activeIndex;
      if (activeIndex >= filteredCases.length) {
        active = filteredCases.length - 1;
      }
      setCurrentTestCase(filteredCases[active]);
      return filteredCases;
    });
  };

  const handleTestCaseChange = (e) => {
    const inputNo = parseInt(e.target.dataset.key);
    const updatedInputValue = e.target.value;
    setTestcases((prevTestcases) =>
      prevTestcases.map((testcase) =>
        testcase.id === currentTestCase.id
          ? {
              ...testcase,
              input: testcase.input.map((input, id) =>
                id === inputNo ? updatedInputValue : input
              ),
            }
          : testcase
      )
    );
    setCurrentTestCase((prevTestCase) => ({
      ...prevTestCase,
      input: prevTestCase.input.map((input, id) =>
        id === inputNo ? updatedInputValue : input
      ),
    }));
  };

  useEffect(() => {
    if (isFullScreen) {
      document.querySelector(".editor").requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  useEffect(() => {
    setTestcases(() =>
      activeProblem.testcases.map((testcase, i) => {
        const id = nanoid();
        if (i === 0)
          setCurrentTestCase({
            id: id,
            input: testcase.input,
            expected: testcase.output,
          });
        return {
          id: id,
          input: testcase.input,
          expected: testcase.output,
        };
      })
    );
  }, [activeProblem]);

  return (
    <div className="relative flex flex-col justify-content-end h-full p-3 overflow-hidden">
      <div className="flex flex-row justify-between items-center border-b border-lightSecondary">
        <div>
          <button
            className={`w-28 p-3 ${
              activeTab === "Testcase"
                ? "border-b-2 border-accent1"
                : "text-grey1 hover:text-white"
            }`}
            onClick={() => setActiveTab("Testcase")}
          >
            Testcase
          </button>
          <button
            className={`w-28 p-3 ${
              activeTab === "Result"
                ? "border-b-2 border-accent1"
                : "text-grey1 hover:text-white"
            }`}
            onClick={() => setActiveTab("Result")}
          >
            Result
          </button>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <div className="relative">
            <FaUndo
              className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
              onClick={clearEditor}
            />
            <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
              Reset
            </div>
          </div>
          <div className="relative">
            <FaCog
              className="settings peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
              onClick={handleSettings}
            />
            <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
              Settings
            </div>
          </div>
          <div className="relative">
            {isFullScreen ? (
              <>
                <FaCompress
                  className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                  onClick={handleFullScreen}
                />
                <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-8 right-0 px-3 py-1 bg-white text-primary rounded-lg">
                  Minimize
                </div>
              </>
            ) : (
              <>
                <FaExpand
                  className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                  onClick={handleFullScreen}
                />
                <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-8 right-0 px-3 py-1 bg-white text-primary rounded-lg">
                  FullScreen
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="grow flex flex-col py-3 px-4 overflow-y-scroll">
        <div className="flex flex-row items-center gap-x-3 mb-3">
          {activeTab === "Testcase"
            ? testcases.map((testcase, id) => (
                <div
                  className={`group relative ${
                    testcase.id === currentTestCase.id ? "bg-primary" : ""
                  } transition-all duration-300 px-3 rounded-lg hover:bg-lightPrimary hover:cursor-pointer w-fit`}
                  data-key={id}
                  key={id}
                  onClick={handleActiveTestCase}
                >
                  <div
                    className={`cross ${
                      testcases.length === 1 ? "hidden" : "group-hover:flex"
                    }  flex-row items-center justify-center hidden absolute -top-1.5 -right-1.5 rounded-full bg-primary shadow w-5 h-5`}
                    data-key={id}
                    key={id}
                    onClick={handleRemoveTestCase}
                  >
                    <ImCross className="text-[0.5rem]" />
                  </div>
                  Case {id + 1}
                </div>
              ))
            : outputReceived &&
              testcases.map((testcase, id) => (
                <div
                  className={`group relative flex items-center gap-x-3
                  ${testcase.id === currentTestCase.id ? "bg-primary" : ""} 
                  transition-all duration-300 px-3 rounded-lg hover:bg-lightPrimary hover:cursor-pointer w-fit`}
                  data-key={id}
                  key={id}
                  onClick={handleActiveTestCase}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      testcase?.output === testcase?.expected
                        ? "bg-easyGreen"
                        : "bg-hardRed"
                    }`}
                  ></span>
                  Case {id + 1}
                </div>
              ))}
          <div className="relative">
            {testcases.length < 6 && activeTab === "Testcase" && (
              <FaPlus
                className="peer text-grey1 hover:cursor-pointer hover:text-grey2"
                onClick={handleAddTestCase}
              />
            )}
            <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-8 left-1/2 -translate-x-1/2 px-3 py-1 whitespace-nowrap bg-white text-primary rounded-lg">
              Add new test case
            </div>
          </div>
        </div>
        <div className="w-full mb-3">
          {activeTab === "Testcase" ? (
            currentTestCase?.input?.map((input, i) => (
              <code key={i}>
                <p className="mb-2">Input {i + 1} = </p>
                <input
                  type="text"
                  data-key={i}
                  value={input}
                  onChange={handleTestCaseChange}
                  className="w-full mb-2 px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none"
                  key={`input-${i}`}
                />
              </code>
            ))
          ) : outputReceived === true ? (
            <>
              {currentTestCase?.input?.map((input, i) => (
                <code key={i}>
                  <p className="mb-2">Input {i + 1} = </p>
                  <input
                    type="text"
                    value={input}
                    className="w-full mb-2 px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none"
                    key={`input-${i}`}
                  />
                </code>
              ))}
              <p className="mb-2">Output = </p>
              <input
                type="text"
                value={currentTestCase?.output}
                className="w-full mb-2 px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none"
              />
              <p className="mb-2">Expected = </p>
              <input
                type="text"
                value={currentTestCase.expected}
                className="w-full mb-2 px-3 py-2 bg-lightPrimary focus:ring-1 focus:ring-accent1 rounded-lg focus:outline-none border-none"
              />
            </>
          ) : (
            <div>Run your code to get results</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Console;
