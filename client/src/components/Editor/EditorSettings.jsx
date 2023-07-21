import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import TabSelector from "./TabSelector";
import { HiMiniXMark } from "react-icons/hi2";

const EditorSettings = ({ isClosing, setIsClosing, editorSettings, setEditorSettings }) => {
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenScoreboard(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div
      className={`settings absolute z-[9999] origin-center ${
        isClosing ? "animate-closeModal" : "animate-openModal"
      } shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 drop-shadow-xl bg-secondary rounded-lg`}
    >
      <div className="flex items-center justify-between mb-3 px-6 py-4 border-b border-accent2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <HiMiniXMark className="text-2xl font-bold hover:cursor-pointer" onClick={closeModal} />
      </div>
      <div className="px-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-lg">Editor Theme</h1>
            <p className="text-md text-grey1">Change the editor theme to your favourite</p>
          </div>
          <ThemeSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <h1 className="text-lg">Font Size</h1>
            <p className="text-md text-grey1">Choose your preferred font size for the code editor.</p>
          </div>
          <FontSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
        </div>
        <div className="flex items-center justify-between py-3 mb-3">
          <div>
            <h1 className="text-lg">Tab Size</h1>
            <p className="text-md text-grey1">Choose the width of a tab character.</p>
          </div>
          <TabSelector editorSettings={editorSettings} setEditorSettings={setEditorSettings} />
        </div>
      </div>
    </div>
  );
};

export default EditorSettings;
