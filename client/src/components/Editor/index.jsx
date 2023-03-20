import { useContext, useEffect, useRef, useState } from "react";
import Split from "react-split";
import { FaAngleUp, FaRegTimesCircle } from "react-icons/fa";
import Description from "./Description";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import Chat from "../Rooms/Chat";
import LanguageSelector from "./LanguageSelector";
import { RoomContext } from "../../layouts/AppLayout";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";
import * as themes from "@uiw/codemirror-themes-all";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import KeyBindSelector from "./KeyBindSelector";
import TabSelector from "./TabSelector";

const Editor = ({ isRoom }) => {
  const editorRef = useRef(null);
  const { connection } = useContext(RoomContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [sizes, setSizes] = useState(isRoom ? [40, 40, 20] : [50, 50]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [editorSettings, setEditorSettings] = useState({ theme: themes.dracula, themeName: "default", language: "Java", fontSize: 12, keyBinding: "Vim", tabSize: 4 });

  useEffect(() => {
    const sizes = JSON.parse(localStorage.getItem("sizes"));
    if ((isRoom && sizes?.length === 3) || (!isRoom && sizes?.length === 2)) setSizes(sizes);
  }, []);

  const updateSize = (sizes) => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
    setSizes(sizes);
  };

  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <Split className="editor flex flex-row grow overflow-hidden h-full" onDrag={updateSize} sizes={sizes} minSize={[0, 500, 0]} maxSize={[2560, 2560, 250]} snapOffset={[300, 0, 200]}>
        <div className="bg-transparentSecondary overflow-x-hidden">
          <Description isRoom={isRoom} />
        </div>
        <div>
          <Split style={{ height: "calc(100% - 56px)" }} direction="vertical" sizes={consoleOpen ? [70, 30] : [100, 0]} minSize={[260, 0]} snapOffset={[0, 100]}>
            <div ref={editorRef} className="z-[-1] h-full bg-primary">
              <CodeEditor isRoom={isRoom} editorSettings={editorSettings} />
            </div>
            <div className="bg-lightAccent3 z-10">
              <Console handleSettings={handleSettings} />
            </div>
          </Split>
          <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
            <div className="flex flex-row items-center gap-x-3">
              <button className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-primary hover:bg-lightPrimary rounded-lg" onClick={() => setConsoleOpen((prev) => !prev)}>
                <p>Console</p>
                <FaAngleUp className={`${consoleOpen ? "rotate-180" : ""}`} />
              </button>
              <LanguageSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
            </div>
            <div className="flex flex-row items-center gap-x-3">
              {!isLoggedIn && (
                <p>
                  Please{" "}
                  <Link to="/app/auth/login" className="text-blue-500 font-bold hover:underline">
                    Log in/Signup
                  </Link>{" "}
                  to run or submit your code
                </p>
              )}
              <button className={`px-4 py-1 bg-primary ${isLoggedIn && "hover:bg-lightPrimary opacity-100"} opacity-50 rounded-lg`} disabled={isLoggedIn}>
                Run
              </button>
              <button className={`px-4 py-1 bg-green ${isLoggedIn && "hover:bg-easyGreen opacity-100"} opacity-50 rounded-lg`} disabled={isLoggedIn}>
                Submit
              </button>
            </div>
          </div>
        </div>
        {isRoom && (
          <div className="bg-lightAccent3">
            <Chat socket={connection} />
          </div>
        )}
      </Split>
      {settingsOpen && (
        <div className="settings absolute z-[9999] p-6 shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-secondary rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <FaRegTimesCircle className="text-2xl font-bold hover:cursor-pointer" onClick={() => setSettingsOpen(!setSettingsOpen)} />
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Editor Theme</h1>
            <ThemeSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Font Size</h1>
            <FontSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Key Bindings</h1>
            <KeyBindSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings}/>
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Tab Size</h1>
            <TabSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
