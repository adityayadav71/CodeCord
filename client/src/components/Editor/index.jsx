import { createContext, useContext, useEffect, useRef, useState } from "react";
import Split from "react-split";
import { TbTerminal2 } from "react-icons/tb";
import ProblemPanel from "./ProblemPanel";
import SubmissionPanel from "./SubmissionPanel";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import Chat from "../Rooms/Chat";
import LanguageSelector from "./LanguageSelector";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import he from "he";

import { getProblem } from "../../api/problemDataAPI";
import { FaCog, FaCompress, FaExpand, FaUndo } from "react-icons/fa";
import Scoreboard from "../Rooms/Scoreboard";
import EditorSettings from "./EditorSettings";
import { getSubmissionDetails } from "../../api/submissionDataAPI";
import { runCode, getResult } from "../../api/codeExecutionAPI";

export const ProblemContext = createContext(null);

const Editor = ({ isRoom }) => {
  // React Router Hooks declaration
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  // Context values
  const { isLoggedIn, userData, socket, setSocket } = useContext(AuthContext);
  let { roomData } = useContext(RoomContext);

  // State Declarations
  const [sizes, setSizes] = useState(isRoom ? [40, 40, 20] : [50, 50]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [editorSizes, setEditorSizes] = useState(consoleOpen ? [60, 40] : [100, 0]);
  const [editorSettings, setEditorSettings] = useState({
    themeName: "default",
    language: "java",
    fontSize: 12,
    tabSize: 2,
    value: "",
  });
  const [problems, setProblems] = useState({});
  const [activeProblem, setActiveProblem] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openScoreboard, setOpenScoreboard] = useState(false);
  const [displaySubmission, setDisplaySubmission] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("Testcase");
  const [output, setOutput] = useState(null);
  const [runningCode, setRunningCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showParticipant, setShowParticipant] = useState(false);
  const isMobileScreen = window.innerWidth < 640;

  // Side effect handlers

  // 1. Action Notification handler
  useEffect(() => {
    if (userData?.user?._id) {
      // Join the user back to stored room
      socket?.emit("join-room", userData, roomData, true);
      setSocket(socket);
    }

    socket?.on("participant-removed", (data) => {
      if (userData?.username === data) {
        toast(
          (t) => (
            <div className="flex items-center text-lg">
              <span className="mr-3 font-semibold">
                🚫 The <b>host removed you</b> from the room.
              </span>
              <button className="px-3 py-1 text-md rounded-lg bg-gray-300 border" onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </button>
            </div>
          ),
          { duration: Infinity }
        );
        navigate("/", { replace: true });
      }
    });
  }, [userData, socket]);

  // 2. Load problem data asynchronously
  useEffect(() => {
    const selectedProblems = roomData?.settings?.problems;

    const loadProblems = async () => {
      setIsLoading(true);
      const response = await getProblem(isRoom ? selectedProblems : [params.name]);

      setProblems(response.problems);
      setActiveProblem(response.problems[0]);
      setIsLoading(false);
    };
    loadProblems();
  }, [roomData]);

  // 3. Handle initializing editor sizes and settings with local storage data
  useEffect(() => {
    const sizes = JSON.parse(localStorage?.getItem("sizes"));
    if ((isRoom && sizes && sizes?.length === 3) || (!isRoom && sizes && sizes?.length === 2)) setSizes(sizes);

    const editorSizes = JSON.parse(localStorage?.getItem("editorSizes"));
    editorSizes && setEditorSizes(editorSizes);

    const editorSettings = JSON.parse(localStorage?.getItem("editorSettings"));
    editorSettings && setEditorSettings(editorSettings);
  }, []);

  // 4. Handle Document click
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".settings") && !event.target.closest(".scoreboard")) {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setSettingsOpen(false);
          setOpenScoreboard(false);
        }, 300);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  // 5. Updating local storage data
  const updateSize = (sizes) => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
    setSizes(sizes);
  };

  const updateEditorSize = (sizes) => {
    localStorage.setItem("editorSizes", JSON.stringify(sizes));
    setEditorSizes(sizes);
  };

  useEffect(() => {
    localStorage.setItem("editorSettings", JSON.stringify(editorSettings));
  }, [editorSettings]);

  useEffect(() => {
    const editorSizes = JSON.parse(localStorage?.getItem("editorSizes"));
    setEditorSizes(consoleOpen && editorSizes ? (editorSizes[0] > 95 ? [60, 40] : editorSizes) : [100, 0]);
  }, [consoleOpen]);

  // Event Handlers

  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const handleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleClearEditor = () => {
    setEditorSettings({ ...editorSettings, value: "" });
  };

  const handleActiveProblemChange = (e) => {
    const direction = e.target.closest(".switch").dataset.position;
    if (direction === "prev")
      problems.forEach((problem, i) => {
        if (problem._id === activeProblem._id && i - 1 >= 0) {
          setActiveProblem(problems[i - 1]);
        }
      });
    else if (direction === "next")
      problems.forEach((problem, i) => {
        if (problem._id === activeProblem._id && i + 1 < problems.length) {
          setActiveProblem(problems[i + 1]);
        }
      });
  };

  const handleRunCode = async () => {
    const data = {
      source_code: encodeURIComponent(he.decode(editorSettings.value)),
      language_id: 4,
      stdin: "[2,7,11,15]\n9",
    };
    setActiveTab("Result");
    setRunningCode(true);
    const response = await runCode(data, setRunningCode);
    const submissionToken = response.token;
    const result = await checkSubmissionStatus(submissionToken);
    if (result) setOutput(result);
    setRunningCode(false);
  };

  const checkSubmissionStatus = async (token) => {
    const response = await getResult(token);
    const { status } = response;
    if (status.description === "In Queue" || status.description === "Processing") {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const result = await checkSubmissionStatus(token);
          resolve(result);
        }, 1000);
      });
    } else {
      return response;
    }
  };

  const handleSubmitCode = () => {};

  const handleSubmissionDisplay = async (submissionId) => {
    setDisplaySubmission(true);
    const submission = await getSubmissionDetails(submissionId);
    setSubmissionDetails(submission);
  };

  return !isMobileScreen ? (
    window.innerWidth < 1024 ? (
      <ProblemContext.Provider value={{ problems, activeProblem, isLoading }}>
        <Split gutterSize={8} className="editor flex flex-row grow overflow-hidden" minSize={[0, 0]} snapOffset={[200, 200]}>
          <div className="relative flex flex-col w-full bg-transparentSecondary overflow-x-hidden">
            <ProblemPanel
              isRoom={isRoom}
              handleSubmissionDisplay={handleSubmissionDisplay}
              handleProblemChange={handleActiveProblemChange}
              setDisplaySubmission={setDisplaySubmission}
              showParticipant={showParticipant}
              setShowParticipant={setShowParticipant}
            />
            {isRoom && <Chat setOpenScoreboard={setOpenScoreboard} isMobileScreen={true} showParticipant={showParticipant} setShowParticipant={setShowParticipant} />}
          </div>
          <div>
            <Split gutterSize={8} style={{ height: "calc(100% - 56px)" }} onDrag={updateEditorSize} sizes={editorSizes} direction="vertical" minSize={[260, 0]} snapOffset={[0, 100]}>
              {displaySubmission ? (
                <div ref={editorRef} className="z-[-1] h-full bg-primary">
                  <SubmissionPanel isRoom={isRoom} submissionDetails={submissionDetails} setSubmissionDetails={setSubmissionDetails} setDisplaySubmission={setDisplaySubmission} />
                </div>
              ) : (
                <div ref={editorRef} className="z-[-1] h-full bg-primary">
                  <CodeEditor isRoom={isRoom} editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
                </div>
              )}
              <div className="bg-lightAccent3 z-10">
                {Object.keys(problems).length > 0 && (
                  <Console isRoom={isRoom} isFullScreen={isFullScreen} activeTab={activeTab} setActiveTab={setActiveTab} output={output} runningCode={runningCode} />
                )}
              </div>
            </Split>
            <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
              <div className="flex flex-row items-center ml-3 gap-x-6">
                <div className="relative">
                  <TbTerminal2 className="peer text-2xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={() => setConsoleOpen((prev) => !prev)} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Console
                  </div>
                </div>
                <div className="relative">
                  <FaUndo className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleClearEditor} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Reset
                  </div>
                </div>
                <div className="settings relative">
                  <FaCog className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleSettings} />
                  <div className="absolute w-max peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Editor Settings
                  </div>
                </div>
                <div className="relative">
                  {isFullScreen ? (
                    <>
                      <FaCompress className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                      <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                        Minimize
                      </div>
                    </>
                  ) : (
                    <>
                      <FaExpand className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                      <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                        FullScreen
                      </div>
                    </>
                  )}
                </div>
                <LanguageSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
              </div>
              <div className="flex flex-row items-center gap-x-3">
                {!isLoggedIn ? (
                  <p>
                    Please{" "}
                    <Link to="/app/auth/login" className="text-blue-500 font-bold hover:underline">
                      Login/Signup
                    </Link>{" "}
                    to run or submit your code
                  </p>
                ) : (
                  <>
                    <button
                      disabled={isRoom && !roomData?.startedAt}
                      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg`}
                      onClick={handleRunCode}
                    >
                      Run
                    </button>
                    <button
                      disabled={isRoom && !roomData?.startedAt}
                      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-green-500 hover:bg-easyGreen rounded-lg`}
                      onClick={handleSubmitCode}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Split>
        {openScoreboard && <Scoreboard isClosing={isClosing} setIsClosing={setIsClosing} setOpenScoreboard={setOpenScoreboard} />}
        {settingsOpen && <EditorSettings isClosing={isClosing} setIsClosing={setIsClosing} editorSettings={editorSettings} setEditorSettings={setEditorSettings} setSettingsOpen={setSettingsOpen} />}
      </ProblemContext.Provider>
    ) : (
      <ProblemContext.Provider value={{ problems, activeProblem, isLoading }}>
        <Split
          gutterSize={8}
          className="editor flex flex-row grow overflow-hidden h-full"
          onDrag={updateSize}
          sizes={sizes}
          minSize={[0, 500, 0]}
          maxSize={[2560, 2560, 250]}
          snapOffset={[300, 0, 200]}
        >
          <div className="flex flex-col bg-transparentSecondary overflow-x-hidden">
            <ProblemPanel
              isRoom={isRoom}
              handleSubmissionDisplay={handleSubmissionDisplay}
              handleProblemChange={handleActiveProblemChange}
              setDisplaySubmission={setDisplaySubmission}
              showParticipant={showParticipant}
              setShowParticipant={setShowParticipant}
            />
          </div>
          <div>
            <Split gutterSize={8} style={{ height: "calc(100% - 56px)" }} onDrag={updateEditorSize} sizes={editorSizes} direction="vertical" minSize={[260, 0]} snapOffset={[0, 100]}>
              {displaySubmission ? (
                <div ref={editorRef} className="z-[-1] h-full bg-primary">
                  <SubmissionPanel isRoom={isRoom} submissionDetails={submissionDetails} setSubmissionDetails={setSubmissionDetails} setDisplaySubmission={setDisplaySubmission} />
                </div>
              ) : (
                <div ref={editorRef} className="z-[-1] h-full bg-primary">
                  <CodeEditor isRoom={isRoom} editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
                </div>
              )}
              <div className="bg-lightAccent3 z-10">
                {Object.keys(problems).length > 0 && (
                  <Console isRoom={isRoom} isFullScreen={isFullScreen} activeTab={activeTab} setActiveTab={setActiveTab} output={output} runningCode={runningCode} />
                )}
              </div>
            </Split>
            <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
              <div className="flex flex-row items-center ml-3 gap-x-6">
                <div className="relative">
                  <TbTerminal2 className="peer text-2xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={() => setConsoleOpen((prev) => !prev)} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Console
                  </div>
                </div>
                <div className="relative">
                  <FaUndo className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleClearEditor} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Reset
                  </div>
                </div>
                <div className="settings relative">
                  <FaCog className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleSettings} />
                  <div className="absolute w-max peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                    Editor Settings
                  </div>
                </div>
                <div className="relative">
                  {isFullScreen ? (
                    <>
                      <FaCompress className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                      <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                        Minimize
                      </div>
                    </>
                  ) : (
                    <>
                      <FaExpand className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                      <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                        FullScreen
                      </div>
                    </>
                  )}
                </div>
                <LanguageSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
              </div>
              <div className="flex flex-row items-center gap-x-3">
                {!isLoggedIn ? (
                  <p>
                    Please{" "}
                    <Link to="/app/auth/login" className="text-blue-500 font-bold hover:underline">
                      Login/Signup
                    </Link>{" "}
                    to run or submit your code
                  </p>
                ) : (
                  <>
                    <button
                      disabled={isRoom && !roomData?.startedAt}
                      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg`}
                      onClick={handleRunCode}
                    >
                      Run
                    </button>
                    <button
                      disabled={isRoom && !roomData?.startedAt}
                      className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-green-500 hover:bg-easyGreen rounded-lg`}
                      onClick={handleSubmitCode}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* If this is a room add a chat window as third split pane */}
          {isRoom && (
            <div className="bg-lightAccent3">
              <Chat setOpenScoreboard={setOpenScoreboard} isMobileScreen={isMobileScreen} showParticipant={showParticipant} setShowParticipant={setShowParticipant} />
            </div>
          )}
        </Split>
        {openScoreboard && <Scoreboard isClosing={isClosing} setIsClosing={setIsClosing} setOpenScoreboard={setOpenScoreboard} />}
        {settingsOpen && <EditorSettings isClosing={isClosing} setIsClosing={setIsClosing} editorSettings={editorSettings} setEditorSettings={setEditorSettings} setSettingsOpen={setSettingsOpen} />}
      </ProblemContext.Provider>
    )
  ) : (
    <ProblemContext.Provider value={{ problems, activeProblem, isLoading }}>
      <div className="relative flex flex-col h-screen w-full bg-transparentSecondary overflow-x-hidden">
        <div className="grow relative flex flex-col w-full bg-transparentSecondary overflow-x-hidden">
          <ProblemPanel
            isRoom={isRoom}
            handleSubmissionDisplay={handleSubmissionDisplay}
            handleProblemChange={handleActiveProblemChange}
            setDisplaySubmission={setDisplaySubmission}
            showParticipant={showParticipant}
            setShowParticipant={setShowParticipant}
          />
          {isRoom && <Chat setOpenScoreboard={setOpenScoreboard} isMobileScreen={isMobileScreen} showParticipant={showParticipant} setShowParticipant={setShowParticipant} />}
        </div>
      </div>
      <div className="editor h-screen">
        <Split gutterSize={8} style={{ height: "calc(100% - 56px)" }} onDrag={updateEditorSize} sizes={editorSizes} direction="vertical" minSize={[260, 0]} snapOffset={[0, 100]}>
          {displaySubmission ? (
            <div ref={editorRef} className="z-[-1] h-full bg-primary">
              <SubmissionPanel isRoom={isRoom} submissionDetails={submissionDetails} setSubmissionDetails={setSubmissionDetails} setDisplaySubmission={setDisplaySubmission} />
            </div>
          ) : (
            <div ref={editorRef} className="z-[-1] h-full bg-primary">
              <CodeEditor isRoom={isRoom} editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
            </div>
          )}
          <div className="bg-lightAccent3 z-10">
            {Object.keys(problems).length > 0 && <Console isRoom={isRoom} isFullScreen={isFullScreen} activeTab={activeTab} setActiveTab={setActiveTab} output={output} runningCode={runningCode} />}
          </div>
        </Split>
        <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
          <div className="flex flex-row items-center ml-3 gap-x-6">
            <div className="relative">
              <TbTerminal2 className="peer text-2xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={() => setConsoleOpen((prev) => !prev)} />
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                Console
              </div>
            </div>
            <div className="relative">
              <FaUndo className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleClearEditor} />
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                Reset
              </div>
            </div>
            <div className="settings relative">
              <FaCog className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleSettings} />
              <div className="absolute w-max peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                Editor Settings
              </div>
            </div>
            <div className="relative">
              {isFullScreen ? (
                <>
                  <FaCompress className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                    Minimize
                  </div>
                </>
              ) : (
                <>
                  <FaExpand className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer" onClick={handleFullScreen} />
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                    FullScreen
                  </div>
                </>
              )}
            </div>
            <LanguageSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
          </div>
          <div className="flex flex-row items-center gap-x-3">
            {!isLoggedIn ? (
              <p>
                Please{" "}
                <Link to="/app/auth/login" className="text-blue-500 font-bold hover:underline">
                  Login/Signup
                </Link>{" "}
                to run or submit your code
              </p>
            ) : (
              <>
                <button
                  disabled={isRoom && !roomData?.startedAt}
                  className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg`}
                  onClick={handleRunCode}
                >
                  Run
                </button>
                <button
                  disabled={isRoom && !roomData?.startedAt}
                  className={`disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1 bg-green-500 hover:bg-easyGreen rounded-lg`}
                  onClick={handleSubmitCode}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {openScoreboard && <Scoreboard isClosing={isClosing} setIsClosing={setIsClosing} setOpenScoreboard={setOpenScoreboard} />}
      {settingsOpen && <EditorSettings isClosing={isClosing} setIsClosing={setIsClosing} editorSettings={editorSettings} setEditorSettings={setEditorSettings} setSettingsOpen={setSettingsOpen} />}
    </ProblemContext.Provider>
  );
};
export default Editor;
