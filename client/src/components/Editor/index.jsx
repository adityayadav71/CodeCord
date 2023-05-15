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
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import * as themes from "@uiw/codemirror-themes-all";

import { getProblem } from "../../api/problemDataAPI";
import queryString from "query-string";
import { FaCog, FaCompress, FaExpand, FaUndo } from "react-icons/fa";
import Scoreboard from "../Rooms/Scoreboard";
import EditorSettings from "./EditorSettings";
import { getSubmissionDetails } from "../../api/submissionDataAPI";

export const ProblemContext = createContext(null);

const Editor = ({ isRoom }) => {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const { isLoggedIn, userData, socket, setSocket } = useContext(AuthContext);
  let { roomData } = useContext(RoomContext);

  useEffect(() => {
    if (userData?.user?._id) {
      // Join the user back to stored room
      socket?.emit("join-room", userData, roomData, true);
      setSocket(socket);
    }

    socket?.on("participant-removed", (data) => {
      if (userData?.username === data) navigate("/", { replace: true });
    });
  }, [userData, socket]);

  const [sizes, setSizes] = useState(isRoom ? [40, 40, 20] : [50, 50]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [editorSettings, setEditorSettings] = useState({
    theme: themes.dracula,
    themeName: "default",
    language: "Java",
    fontSize: 12,
    keyBinding: "Vim",
    tabSize: 2,
    value: localStorage.getItem("editorValue") || "",
  });
  const [problems, setProblems] = useState({});
  const [activeProblem, setActiveProblem] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openScoreboard, setOpenScoreboard] = useState(false);
  const [displaySubmission, setDisplaySubmission] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(false);
  const params = useParams();
  const location = useLocation();

  const values = queryString.parse(location.search);

  useEffect(() => {
    const selectedProblems =
      values?.problems?.split(",") || // User creating a new room
      roomData?.settings?.problems; // User joining a new room

    const loadProblems = async () => {
      let response;
      isRoom
        ? (response = await getProblem(selectedProblems))
        : (response = await getProblem([params.name]));

      setProblems(response.problems);
      setActiveProblem(response.problems[0]);
    };
    loadProblems();
  }, []);

  useEffect(() => {
    const sizes = JSON.parse(localStorage.getItem("sizes"));
    if ((isRoom && sizes?.length === 3) || (!isRoom && sizes?.length === 2))
      setSizes(sizes);
  }, []);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".settings")) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const updateSize = (sizes) => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
    setSizes(sizes);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleClearEditor = () => {
    localStorage.clear("editorValue");
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

  const handleRunCode = () => {};
  const handleSubmitCode = () => {};
  
  const handleSubmissionDisplay = async (submissionId) => {
    setDisplaySubmission(true);
    const submission = await getSubmissionDetails(submissionId);
    setSubmissionDetails(submission);
  };

  return (
    <ProblemContext.Provider value={{ problems, activeProblem }}>
      <Split
        className="editor flex flex-row grow overflow-hidden h-full"
        onDrag={updateSize}
        sizes={sizes}
        minSize={[0, 500, 0]}
        maxSize={[2560, 2560, 250]}
        snapOffset={[300, 0, 200]}
      >
        <div className="bg-transparentSecondary overflow-x-hidden">
          <ProblemPanel
            isRoom={isRoom}
            handleSubmissionDisplay={handleSubmissionDisplay}
            handleProblemChange={handleActiveProblemChange}
            setDisplaySubmission={setDisplaySubmission}
          />
        </div>
        <div>
          <Split
            style={{ height: "calc(100% - 56px)" }}
            direction="vertical"
            sizes={consoleOpen ? [70, 30] : [100, 0]}
            minSize={[260, 0]}
            snapOffset={[0, 100]}
          >
            {displaySubmission ? (
              <div ref={editorRef} className="z-[-1] h-full bg-primary">
                <SubmissionPanel
                  isRoom={isRoom}
                  submissionDetails={submissionDetails}
                  setSubmissionDetails={setSubmissionDetails}
                  setDisplaySubmission={setDisplaySubmission}
                />
              </div>
            ) : (
              <div ref={editorRef} className="z-[-1] h-full bg-primary">
                <CodeEditor
                  isRoom={isRoom}
                  editorSettings={editorSettings}
                  setEditorSettings={setEditorSettings}
                />
              </div>
            )}
            <div className="bg-lightAccent3 z-10">
              {Object.keys(problems).length > 0 && (
                <Console
                  isFullScreen={isFullScreen}
                  editorSettings={editorSettings}
                  problems={activeProblem}
                />
              )}
            </div>
          </Split>
          <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
            <div className="flex flex-row items-center ml-3 gap-x-6">
              <div className="relative">
                <TbTerminal2
                  className="peer text-2xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                  onClick={() => setConsoleOpen((prev) => !prev)}
                />
                <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                  Console
                </div>
              </div>
              <div className="relative">
                <FaUndo
                  className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                  onClick={handleClearEditor}
                />
                <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                  Reset
                </div>
              </div>
              <div className="relative">
                <FaCog
                  className="settings peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                  onClick={handleSettings}
                />
                <div className="absolute w-max peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-6 px-3 py-1 bg-white text-primary rounded-lg">
                  Editor Settings
                </div>
              </div>
              <div className="relative">
                {isFullScreen ? (
                  <>
                    <FaCompress
                      className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                      onClick={handleFullScreen}
                    />
                    <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                      Minimize
                    </div>
                  </>
                ) : (
                  <>
                    <FaExpand
                      className="peer text-xl rounded-lg hover:text-grey1 hover:cursor-pointer"
                      onClick={handleFullScreen}
                    />
                    <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 bottom-8 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                      FullScreen
                    </div>
                  </>
                )}
              </div>
              <LanguageSelector
                editorSettings={editorSettings}
                setEditorSettings={setEditorSettings}
              />
            </div>
            <div className="flex flex-row items-center gap-x-3">
              {!isLoggedIn ? (
                <p>
                  Please
                  <Link
                    to="/app/auth/login"
                    className="text-blue-500 font-bold hover:underline"
                  >
                    Log in/Signup
                  </Link>
                  to run or submit your code
                </p>
              ) : (
                <>
                  <button
                    className={`px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg`}
                    onClick={handleRunCode}
                  >
                    Run
                  </button>
                  <button
                    className={`px-4 py-1 bg-green hover:bg-easyGreen rounded-lg`}
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
        {isRoom ? (
          <div className="bg-lightAccent3">
            <Chat setOpenScoreboard={setOpenScoreboard} />
          </div>
        ) : null}
      </Split>
      {openScoreboard && <Scoreboard setOpenScoreboard={setOpenScoreboard} />}
      {settingsOpen && (
        <EditorSettings
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
          setSettingsOpen={setSettingsOpen}
        />
      )}
    </ProblemContext.Provider>
  );
};

export default Editor;
