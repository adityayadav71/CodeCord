import { FaUserAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CodeMirror from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";
import { java } from "@codemirror/lang-java";

const CodeEditor = ({ isRoom, editorSettings, setEditorSettings }) => {
  const stateFields = { history: historyField };

  const serializedState = localStorage.getItem("myEditorState");

  return (
    <div className="flex flex-col h-full">
      {isRoom && (
        <Swiper
          className="flex flex-row items-center shrink-0 w-full gap-x-5 border-b border-lightAccent3 relative"
          slidesPerView={4}
        >
          <SwiperSlide className="py-3 border-b-2 border-accent1">
            <button className="flex flex-row items-center justify-center gap-x-3 px-6 py-2 w-full rounded-lg">
              <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                <FaUserAlt className="text-2xl hover:cursor-pointer" />
              </div>
              <p>User 1</p>
            </button>
          </SwiperSlide>
          <SwiperSlide className="py-3 hover:border-b-2 border-grey3">
            <button className="flex flex-row items-center justify-center gap-x-3 px-3 py-2 w-full rounded-lg">
              <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                <FaUserAlt className="text-2xl hover:cursor-pointer" />
              </div>
              <p>User 2</p>
            </button>
          </SwiperSlide>
          <SwiperSlide className="py-3 hover:border-b-2 border-grey3">
            <button className="flex flex-row items-center justify-center gap-x-3 px-3 py-2 w-full rounded-lg">
              <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                <FaUserAlt className="text-2xl hover:cursor-pointer" />
              </div>
              <p>User 3</p>
            </button>
          </SwiperSlide>
          <SwiperSlide className="py-3 hover:border-b-2 border-grey3">
            <button className="flex flex-row items-center justify-center gap-x-3 px-3 py-2 w-full rounded-lg">
              <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                <FaUserAlt className="text-2xl hover:cursor-pointer" />
              </div>
              <p>User 4</p>
            </button>
          </SwiperSlide>
        </Swiper>
      )}
      <CodeMirror
        className="grow w-full overflow-scroll hideScrollbar"
        value={editorSettings.value}
        theme={editorSettings.theme}
        height="100%"
        basicSetup={{
          tabSize: editorSettings.tabSize,
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
            return { ...prevSettings, value: value };
          });
          localStorage.setItem("editorValue", value);

          const state = viewUpdate.state.toJSON(stateFields);
          localStorage.setItem("myEditorState", JSON.stringify(state));
        }}
        extensions={[java()]}
      />
    </div>
  );
};

export default CodeEditor;
