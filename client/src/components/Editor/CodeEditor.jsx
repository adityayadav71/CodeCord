import { FaUserAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CodeMirror from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";
import { java } from "@codemirror/lang-java";
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
  });

  const themeMap = {
    default: themes.dracula,
    abcdef: themes.abcdef,
    androidstudio: themes.androidstudio,
    atomone: themes.atomone,
    aura: themes.aura,
    bbedit: themes.bbedit,
    bespin: themes.bespin,
    darcula: themes.darcula,
    duotoneDark: themes.duotoneDark,
    duotoneLight: themes.duotoneLight,
    eclipse: themes.eclipse,
    githubDark: themes.githubDark,
    githubLight: themes.githubLight,
    gruvboxDark: themes.gruvboxDark,
    gruvboxLight: themes.gruvboxLight,
    material: themes.material,
    materialDark: themes.materialDark,
    materialLight: themes.materialLight,
    noctisLilac: themes.noctisLilac,
    nord: themes.nord,
    okaidia: themes.okaidia,
    solarizedDark: themes.solarizedDark,
    solarizedLight: themes.solarizedLight,
    sublime: themes.sublime,
    tokyoNight: themes.tokyoNight,
    tokyoNightDay: themes.tokyoNightDay,
    tokyoNightStorm: themes.tokyoNightStorm,
    vscodeDark: themes.vscodeDark,
    xcodeDark: themes.xcodeDark,
    xcodeLight: themes.xcodeLight,
  }
  
  return (
    <div className="flex flex-col h-full">
      {isRoom && roomData?.participants && (
        <Swiper
          className="flex flex-row items-center shrink-0 w-full gap-x-5 border-b border-lightAccent3 relative"
          slidesPerView={4}
        >
          {roomData?.participants?.map((participant, i) => (
            <SwiperSlide
              key={i}
              className={`py-3 ${
                participant?.username === activeEditor
                  ? "border-b-2 border-accent1"
                  : ""
              }`}
              onClick={() => setActiveEditor(participant?.username)}
            >
              <button className="flex flex-row items-center justify-center gap-x-3 px-6 py-2 rounded-lg">
                <div className="flex flex-row items-center justify-center rounded-full bg-grey2">
                  {participant?.avatar ? (
                    <img
                      className="w-8 h-8 overflow-clip object-cover rounded-full"
                      src={`data:${participant?.avatar?.contentType};base64,${participant?.avatar?.image}`}
                      alt="user-profile-picture"
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-full bg-grey2 w-8 h-8 text-xl">
                      <FaUserAlt className="text-xl hover:cursor-pointer" />
                    </div>
                  )}
                </div>
                <p>
                  {participant?.username === userData?.username
                    ? "Me"
                    : participant?.username}
                </p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <CodeMirror
        className="grow w-full overflow-scroll hideScrollbar"
        value={editorSettings.value}
        theme={themeMap[editorSettings.themeName]}
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
        extensions={[java(), FontSizeTheme]}
      />
    </div>
  );
};

export default CodeEditor;
