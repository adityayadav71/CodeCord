import { FaAngleDown } from "react-icons/fa";
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
      <button className="flex flex-row w-40 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setTabOpen((prev) => !prev)}>
        <p>{editorSettings.tabSize} spaces</p>
        <FaAngleDown className={`${tabOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 shadow shadow-heavyDropDown ${tabOpen ? "block" : "hidden"} top-12 left-0 w-fit rounded-lg bg-accent3 hideScrollbar overflow-scroll h-fit`}>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setTabOpen(false);
            setEditorSettings({ ...editorSettings, tabSize: 2 });
          }}
        >
          2 spaces
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setTabOpen(false);
            setEditorSettings({ ...editorSettings, tabSize: 4 });
          }}
        >
          4 spaces
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
