import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Description from "./Description";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import Chat from "../Rooms/Chat";

const Editor = (props) => {
  const editorRef = useRef(null);
  const [sizes, setSizes] = useState([40, 40, 20]);
  const [editorHeight, setEditorHeight] = useState("200px");

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
    <Split className="flex flex-row grow overflow-hidden" onDrag={handleDrag} sizes={sizes} minSize={[0, 500, 0]} maxSize={[2560, 2560, 250]} snapOffset={[300, 0, 200]}>
      <div className="bg-transparentSecondary">
        <Description />
      </div>
      <div>
        <Split style={{ height: "calc(100% - 56px)" }} onDrag={changeEditorHeight} direction="vertical" sizes={[70, 30]} minSize={[260, 0]} snapOffset={[0, 100]}>
          <div ref={editorRef} className="z-[-1] h-full bg-primary">
            <CodeEditor editorHeight={editorHeight} />
          </div>
          <div className="bg-lightAccent3 z-10">
            <Console />
          </div>
        </Split>
        <div className="flex flex-row items-center bg-lightAccent3 justify-between p-3 h-[56px] font-bold">
          <div>
            <button className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-lightPrimary rounded-lg">
              <p>Console</p>
              <FaAngleUp />
            </button>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <button className="px-4 py-1 bg-primary rounded-lg">Run</button>
            <button className="px-4 py-1 bg-green rounded-lg">Submit</button>
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
