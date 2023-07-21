import { FaAngleDown, FaCheck } from "react-icons/fa";
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
        drop-shadow-lg bottom-12 left-0 w-fit p-2 rounded-lg bg-primary overflow-y-scroll h-44`}
      >
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Java" });
          }}
        >
          Java
          {editorSettings.language === "Java" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "C++" });
          }}
        >
          C++
          {editorSettings.language === "C++" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between gap-3 w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "JavaScript" });
          }}
        >
          JavaScript
          {editorSettings.language === "JavaScript" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Python" });
          }}
        >
          Python
          {editorSettings.language === "Python" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setLanguageOpen(false);
            setEditorSettings({ ...editorSettings, language: "Rust" });
          }}
        >
          Rust
          {editorSettings.language === "Rust" && <FaCheck className="text-accent1"/>}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
