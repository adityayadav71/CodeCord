import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import KeyBindSelector from "./KeyBindSelector";
import TabSelector from "./TabSelector";
import { FaRegTimesCircle } from "react-icons/fa";

const EditorSettings = ({
  editorSettings,
  setEditorSettings,
  setSettingsOpen,
}) => {
  return (
    <div className="settings absolute z-[9999] p-6 shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-secondary rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <FaRegTimesCircle
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => setSettingsOpen(false)}
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-lg">Editor Theme</h1>
        <ThemeSelector
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-lg">Font Size</h1>
        <FontSelector
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-lg">Key Bindings</h1>
        <KeyBindSelector
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />
      </div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-lg">Tab Size</h1>
        <TabSelector
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />
      </div>
    </div>
  );
};

export default EditorSettings;
