import { FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const KeyBindSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".keyBind-dropdown")) {
        setBindOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [bindOpen, setBindOpen] = useState(false);
  return (
    <div className="relative keyBind-dropdown">
      <button className="flex flex-row w-40 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setBindOpen((prev) => !prev)}>
        <p>{editorSettings.keyBinding}</p>
        <FaAngleDown className={`${bindOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 shadow shadow-heavyDropDown ${bindOpen ? "block" : "hidden"} top-12 left-0 w-full rounded-lg bg-accent3 hideScrollbar overflow-scroll h-fit`}>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setBindOpen(false);
            setEditorSettings({ ...editorSettings, keyBinding: "Vim" });
          }}
        >
          Vim
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setBindOpen(false);
            setEditorSettings({ ...editorSettings, keyBinding: "Emacs" });
          }}
        >
          Emacs
        </button>
      </div>
    </div>
  );
};

export default KeyBindSelector;
