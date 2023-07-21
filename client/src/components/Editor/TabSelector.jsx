import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

const TabSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".tab-dropdown")) {
        setTabOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [tabOpen, setTabOpen] = useState(false);
  return (
    <div className="relative tab-dropdown">
      <button className="flex flex-row w-44 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setTabOpen((prev) => !prev)}>
        <p>{editorSettings.tabSize} spaces</p>
        <FaAngleDown className={`${tabOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 drop-shadow-lg ${tabOpen ? "block" : "hidden"} top-12 left-0 w-full p-2 rounded-lg bg-accent3 overflow-y-scroll h-fit`}>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setTabOpen(false);
            setEditorSettings({ ...editorSettings, tabSize: 2 });
          }}
        >
          2 spaces
          {editorSettings.tabSize === 2 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setTabOpen(false);
            setEditorSettings({ ...editorSettings, tabSize: 4 });
          }}
        >
          4 spaces
          {editorSettings.tabSize === 4 && <FaCheck className="text-accent1"/>}
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
