import { FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const LanguageSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".language-dropdown")) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [languageOpen, setLanguageOpen] = useState(false);
  return (
    <div className="relative language-dropdown">
      <button className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-primary hover:bg-lightPrimary rounded-lg" onClick={() => setLanguageOpen((prev) => !prev)}>
        <p>{editorSettings.language}</p>
        <FaAngleDown className={`${languageOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`language absolute z-50
        ${languageOpen ? "block" : "hidden"} 
        bottom-12 left-0 w-fit rounded-lg bg-primary hideScrollbar overflow-scroll h-40`}
      >
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Java" });
          }}
        >
          Java
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "C++" });
          }}
        >
          C++
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "JavaScript" });
          }}
        >
          JavaScript
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Python" });
          }}
        >
          Python
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Rust" });
          }}
        >
          Rust
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
