import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import { FaAngleUp } from "react-icons/fa";
import Description from "./Description";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import Chat from "../Rooms/Chat";
import LanguageSelector from "./LanguageSelector";
import { io } from "socket.io-client";

const Editor = ({ isRoom }) => {
  const editorRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const [roomMessage, setRoomMessage] = useState("");
  const [sizes, setSizes] = useState(isRoom ? [40, 40, 20] : [50, 50]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [language, setLanguage] = useState("Java");
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        !event.target.closest(".dropdown") ||
        event.target.closest(".language")
      ) {
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

    if (isRoom) {
      const socket = io("http://localhost:5000");
      socket.on("user-joined", (message) => {
        console.log(message);
        setRoomMessage(message)
      });
    }
  }, []);

  const updateSize = (sizes) => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
    setSizes(sizes);
  };

  return (
    <Split className="flex flex-row grow overflow-hidden h-full" onDrag={updateSize} sizes={sizes} minSize={[0, 500, 0]} maxSize={[2560, 2560, 250]} snapOffset={[300, 0, 200]}>
      <div className="bg-transparentSecondary overflow-x-hidden">
        <Description isRoom={isRoom} />
      </div>
      <div>
        <Split style={{ height: "calc(100% - 56px)" }} direction="vertical" sizes={consoleOpen ? [70, 30] : [100, 0]} minSize={[260, 0]} snapOffset={[0, 100]}>
          <div ref={editorRef} className="z-[-1] h-full bg-primary">
            <CodeEditor language={language} />
          </div>
          <div className="bg-lightAccent3 z-10">
            <Console />
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
            <button className="px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg">Run</button>
            <button className="px-4 py-1 bg-green hover:bg-easyGreen rounded-lg">Submit</button>
          </div>
        </div>
      </div>
      {isRoom && (
        <div className="bg-lightAccent3">
          <Chat socket={connection} roomMessage={roomMessage} setRoomMessage={setRoomMessage}/>
        </div>
      )}
    </Split>
  );
};

export default Editor;
