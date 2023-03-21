import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

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
      <button className="flex flex-row w-40 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setFontSizeOpen((prev) => !prev)}>
        <p>{editorSettings.fontSize}px</p>
        <FaAngleDown className={`${fontSizeOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 ${fontSizeOpen ? "block" : "hidden"} top-12 left-0 w-fit rounded-lg bg-accent3 hideScrollbar overflow-scroll h-40`}>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 12 });
          }}
        >
          12px
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 13 });
          }}
        >
          13px
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 14 });
          }}
        >
          14px
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 15 });
          }}
        >
          15px
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 16 });
          }}
        >
          16px
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setFontSizeOpen(false);
            setEditorSettings({ ...editorSettings, fontSize: 17 });
          }}
        >
          17px
        </button>
      </div>
    </div>
  );
};

export default FontSelector;
