import { FaUserAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CodeMirror from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { useContext, useState } from "react";
import { RoomContext } from "../../layouts/AppLayout";
import { AuthContext } from "../../App";
import { EditorView } from "@codemirror/view";
import * as themes from "@uiw/codemirror-themes-all";

const CodeEditor = ({ isRoom, editorSettings, setEditorSettings }) => {
  const stateFields = { history: historyField };
  const { roomData } = useContext(RoomContext);
  const { userData } = useContext(AuthContext);

  const serializedState = localStorage.getItem("myEditorState");

  const [activeEditor, setActiveEditor] = useState(userData?.username);

  const FontSizeTheme = EditorView.theme({
    "&": {
      fontSize: `${editorSettings.fontSize - 3}pt`,
    },
    '&.cm-focused .cm-content ::selection': {
      color: "#D9D9D9",
    },
  });

  const languages = {
    java: java,
    cpp: cpp,
    javascript: javascript,
    python: python,
    rust: rust,
  };
  console.log(languages.cpp());
  const selectedLanguage = languages[editorSettings.language]() || languages.java();

  return (
    <div className="flex flex-col h-full">
      {isRoom && roomData?.participants && (
        <Swiper className="flex flex-row items-center shrink-0 w-full gap-x-5 border-b border-lightAccent3 relative" slidesPerView={4}>
          {roomData?.participants?.map((participant, i) => (
            <SwiperSlide key={i} className={`py-3 ${participant?.username === activeEditor ? "border-b-2 border-accent1" : ""}`} onClick={() => setActiveEditor(participant?.username)}>
              <button className="flex flex-row items-center justify-center gap-x-3 px-6 py-2 rounded-lg">
                <div className="flex flex-row items-center justify-center rounded-full bg-grey2">
                  {participant?.avatar ? (
                    <img className="w-8 h-8 overflow-clip object-cover rounded-full" src={`data:${participant?.avatar?.contentType};base64,${participant?.avatar?.image}`} alt="user-profile-picture" />
                  ) : (
                    <div className="flex items-center justify-center rounded-full bg-grey2 w-8 h-8 text-xl">
                      <FaUserAlt className="text-xl hover:cursor-pointer" />
                    </div>
                  )}
                </div>
                <p>{participant?.username === userData?.username ? "Me" : participant?.username}</p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <CodeMirror
        className="grow w-full overflow-scroll hideScrollbar"
        value={editorSettings.value}
        theme={themes[editorSettings.themeName === "default" ? "dracula" : editorSettings.themeName]}
        height="100%"
        basicSetup={{
          tabSize: editorSettings.tabSize,
          highlightActiveLine: false,
          autoIndent: true,
        }}
        initialState={
          serializedState
            ? {
                json: JSON.parse(serializedState || ""),
                fields: stateFields,
              }
            : undefined
        }
        onChange={(value, viewUpdate) => {
          setEditorSettings((prevSettings) => {
            return { ...prevSettings, value };
          });

          const state = viewUpdate.state.toJSON(stateFields);
          localStorage.setItem("myEditorState", JSON.stringify(state));
        }}
        extensions={[selectedLanguage, FontSizeTheme]}
      />
    </div>
  );
};

export default CodeEditor;
