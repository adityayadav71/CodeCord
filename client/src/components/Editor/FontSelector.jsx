import { useState, useEffect } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const FontSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".font-dropdown")) {
        setFontSizeOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  return (
    <div className="relative font-dropdown">
      <button className="flex flex-row w-44 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setFontSizeOpen((prev) => !prev)}>
        <p>{editorSettings.fontSize}px</p>
        <FaAngleDown className={`${fontSizeOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute drop-shadow-lg z-50 ${fontSizeOpen ? "block" : "hidden"} top-12 left-0 w-full p-2 rounded-lg bg-accent3 overflow-y-scroll h-40`}>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 12 });
          }}
        >
          12px
          {editorSettings.fontSize === 12 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 13 });
          }}
        >
          13px
          {editorSettings.fontSize === 13 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 14 });
          }}
        >
          14px
          {editorSettings.fontSize === 14 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 15 });
          }}
        >
          15px
          {editorSettings.fontSize === 15 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 16 });
          }}
        >
          16px
          {editorSettings.fontSize === 16 && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 17 });
          }}
        >
          17px
          {editorSettings.fontSize === 17 && <FaCheck className="text-accent1"/>}
        </button>
      </div>
    </div>
  );
};

export default FontSelector;
