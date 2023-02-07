import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Description from "./Description";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import Chat from "../Rooms/Chat";
import * as themes from "@uiw/codemirror-themes-all";

const Editor = (props) => {
  const editorRef = useRef(null);
  const [sizes, setSizes] = useState([40, 40, 20]);
  const [editorHeight, setEditorHeight] = useState("200px");
  const [editorTheme, setEditorTheme] = useState(themes.dracula);
  const [themesOpen, setThemesOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setThemesOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    setEditorHeight(editorRef.current.offsetHeight - 56 + "px");
  }, []);

  useEffect(() => {
    const sizes = JSON.parse(localStorage.getItem("sizes"));
    setSizes(sizes);
  }, []);

  const handleDrag = (sizes) => {
    localStorage.setItem("sizes", JSON.stringify(sizes));
  };

  const changeEditorHeight = () => {
    setEditorHeight(editorRef.current.offsetHeight - 56 + "px");
  };

  return (
    <Split
      className="flex flex-row grow overflow-hidden"
      onDrag={handleDrag}
      sizes={sizes}
      minSize={[0, 500, 0]}
      maxSize={[2560, 2560, 250]}
      snapOffset={[300, 0, 200]}
    >
      <div className="bg-transparentSecondary">
        <Description />
      </div>
      <div>
        <Split
          style={{ height: "calc(100% - 56px)" }}
          onDrag={changeEditorHeight}
          direction="vertical"
          sizes={consoleOpen ? [70, 30] : [100, 0]}
          minSize={[260, 0]}
          snapOffset={[0, 100]}
        >
          <div ref={editorRef} className="z-[-1] h-full bg-primary">
            <CodeEditor editorHeight={editorHeight} theme={editorTheme} />
          </div>
          <div className="bg-lightAccent3 z-10">
            <Console />
          </div>
        </Split>
        <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
          <div className="flex flex-row items-center gap-x-3">
              <button className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-primary hover:bg-lightPrimary rounded-lg" onClick={() => setConsoleOpen((prev) => !prev)}>
                <p>Console</p>
                <FaAngleUp className={`${consoleOpen ? "rotate-180": ""}`}/>
              </button>
            <div className="relative dropdown">
              <button className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-primary hover:bg-lightPrimary rounded-lg" onClick={() => setThemesOpen((prev) => !prev)}>
                <p>Theme</p>
                <FaAngleUp className={`${themesOpen ? "rotate-180": ""}`}/>
              </button>
              <div className={`absolute ${themesOpen ? "block" : "hidden"} bottom-12 left-0 w-fit rounded-lg bg-primary hideScrollbar overflow-scroll h-40`}>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.dracula)}>default</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.abcdef)}>abcdef</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.androidstudio)}>androidstudio</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.atomone)}>atomone</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.aura)}>aura</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.bbedit)}>bbedit</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.bespin)}>bespin</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.darcula)}>darcula</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.duotoneDark)}>duotoneDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.duotoneLight)}>duotoneLight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.eclipse)}>eclipse</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.githubDark)}>githubDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.githubLight)}>githubLight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.gruvboxDark)}>gruvboxDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.gruvboxLight)}>gruvboxLight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.material)}>material</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.materialDark)}>materialDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.materialLight)}>materialLight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.noctisLilac)}>noctisLilac</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.nord)}>nord</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.okaidia)}>okaidia</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.solarizedDark)}>solarizedDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.solarizedLight)}>solarizedLight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.sublime)}>sublime</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNight)}>tokyoNight</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNightDay)}>tokyoNightDay</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNightStorm)}>tokyoNightStorm</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.vscodeDark)}>vscodeDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.xcodeDark)}>xcodeDark</button>
                <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.xcodeLight)}>xcodeLight</button>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <button className="px-4 py-1 bg-primary hover:bg-lightPrimary rounded-lg">
              Run
            </button>
            <button className="px-4 py-1 bg-green hover:bg-easyGreen rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="bg-lightAccent3">
        <Chat />
      </div>
    </Split>
  );
};

export default Editor;
