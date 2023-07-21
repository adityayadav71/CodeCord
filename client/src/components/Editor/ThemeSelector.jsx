import { useState, useEffect } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const ThemeSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".theme-dropdown")) {
        setThemesOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [themesOpen, setThemesOpen] = useState(false);

  return (
    <div className="relative theme-dropdown">
      <button className="flex flex-row w-44 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setThemesOpen((prev) => !prev)}>
        <p>{editorSettings.themeName}</p>
        <FaAngleDown className={`${themesOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 drop-shadow-lg ${themesOpen ? "block" : "hidden"} top-12 left-0 w-full p-2 rounded-lg bg-accent3 overflow-y-scroll h-40`}>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "default" });
          }}
        >
          default
          {editorSettings.themeName === "default" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "abcdef" });
          }}
        >
          abcdef
          {editorSettings.themeName === "abcdef" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "androidstudio" });
          }}
        >
          androidstudio
          {editorSettings.themeName === "androidstudio" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "atomone" });
          }}
        >
          atomone
          {editorSettings.themeName === "atomone" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "aura" });
          }}
        >
          aura
          {editorSettings.themeName === "aura" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "bbedit" });
          }}
        >
          bbedit
          {editorSettings.themeName === "bbedit" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "bespin" });
          }}
        >
          bespin
          {editorSettings.themeName === "bespin" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "darcula" });
          }}
        >
          darcula
          {editorSettings.themeName === "darcula" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "duotoneDark" });
          }}
        >
          duotoneDark
          {editorSettings.themeName === "duotoneDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "duotoneLight" });
          }}
        >
          duotoneLight
          {editorSettings.themeName === "duotoneLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "eclipse" });
          }}
        >
          eclipse
          {editorSettings.themeName === "eclipse" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "githubDark" });
          }}
        >
          githubDark
          {editorSettings.themeName === "githubDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "githubLight" });
          }}
        >
          githubLight
          {editorSettings.themeName === "githubLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "gruvboxDark" });
          }}
        >
          gruvboxDark
          {editorSettings.themeName === "gruvboxDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "gruvboxLight" });
          }}
        >
          gruvboxLight
          {editorSettings.themeName === "gruvboxLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "material" });
          }}
        >
          material
          {editorSettings.themeName === "material" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "materialDark" });
          }}
        >
          materialDark
          {editorSettings.themeName === "materialDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "materialLight" });
          }}
        >
          materialLight
          {editorSettings.themeName === "materialLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "noctisLilac" });
          }}
        >
          noctisLilac
          {editorSettings.themeName === "noctisLilac" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "nord" });
          }}
        >
          nord
          {editorSettings.themeName === "nord" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "okaidia" });
          }}
        >
          okaidia
          {editorSettings.themeName === "okaidia" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "solarizedDark" });
          }}
        >
          solarizedDark
          {editorSettings.themeName === "solarizedDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "solarizedLight" });
          }}
        >
          solarizedLight
          {editorSettings.themeName === "solarizedLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "sublime" });
          }}
        >
          sublime
          {editorSettings.themeName === "sublime" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "tokyoNight" });
          }}
        >
          tokyoNight
          {editorSettings.themeName === "tokyoNight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "tokyoNightDay" });
          }}
        >
          tokyoNightDay
          {editorSettings.themeName === "tokyoNightDay" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "tokyoNightStorm" });
          }}
        >
          tokyoNightStorm
          {editorSettings.themeName === "tokyoNightStorm" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "vscodeDark" });
          }}
        >
          vscodeDark
          {editorSettings.themeName === "vscodeDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "xcodeDark" });
          }}
        >
          xcodeDark
          {editorSettings.themeName === "xcodeDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, themeName: "xcodeLight" });
          }}
        >
          xcodeLight
          {editorSettings.themeName === "xcodeLight" && <FaCheck className="text-accent1"/>}
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
