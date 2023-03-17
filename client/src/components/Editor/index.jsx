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

const Editor = ({ isRoom }) => {
  const editorRef = useRef(null);
  const { connection } = useContext(RoomContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [sizes, setSizes] = useState(isRoom ? [40, 40, 20] : [50, 50]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [language, setLanguage] = useState("Java");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  const [editorTheme, setEditorTheme] = useState(themes.dracula);
  const [editorFontSize, setEditorFontSize] = useState(themes.dracula);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown") || event.target.closest(".language")) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

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
              <CodeEditor language={language} isRoom={isRoom} editorTheme={editorTheme} editorFontSize={editorFontSize} />
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
              <LanguageSelector language={language} setLanguage={setLanguage} languageOpen={languageOpen} setLanguageOpen={setLanguageOpen} />
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
            <ThemeSelector setEditorTheme={setEditorTheme} />
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Font Size</h1>
            <div className="relative dropdown">
              <button className="flex flex-row w-40 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setFontSizeOpen((prev) => !prev)}>
                <p>Font Size</p>
                <FaAngleUp className={`${fontSizeOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute ${fontSizeOpen ? "block" : "hidden"} top-12 left-0 w-fit rounded-lg bg-accent3 hideScrollbar overflow-scroll h-40`}>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(12);
                  }}
                >
                  12px
                </button>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(13);
                  }}
                >
                  13px
                </button>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(14);
                  }}
                >
                  14px
                </button>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(15);
                  }}
                >
                  15px
                </button>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(16);
                  }}
                >
                  16px
                </button>
                <button
                  className="w-full text-left px-3 hover:bg-lightPrimary"
                  onClick={() => {
                    setFontSizeOpen(false);
                    setEditorFontSize(17);
                  }}
                >
                  17px
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Key Bindings</h1>
            <select className="w-40 p-3 hover:cursor-pointer focus:outline-none bg-accent3 rounded-lg">
              <option value="Vim">Vim</option>
              <option value="Emacs">Emacs</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg">Tab Size</h1>
            <select className="w-40 p-3 hover:cursor-pointer focus:outline-none bg-accent3 rounded-lg">
              <option value="4">4 spaces</option>
              <option value="2">2 spaces</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
