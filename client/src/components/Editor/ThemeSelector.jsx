import { useState, useEffect } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import * as themes from "@uiw/codemirror-themes-all";

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
            setEditorSettings({ ...editorSettings, theme: themes.dracula, themeName: "default" });
          }}
        >
          default
          {editorSettings.themeName === "default" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.abcdef, themeName: "abcdef" });
          }}
        >
          abcdef
          {editorSettings.themeName === "abcdef" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.androidstudio, themeName: "androidstudio" });
          }}
        >
          androidstudio
          {editorSettings.themeName === "androidstudio" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.atomone, themeName: "atomone" });
          }}
        >
          atomone
          {editorSettings.themeName === "atomone" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.aura, themeName: "aura" });
          }}
        >
          aura
          {editorSettings.themeName === "aura" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.bbedit, themeName: "bbedit" });
          }}
        >
          bbedit
          {editorSettings.themeName === "bbedit" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.bespin, themeName: "bespin" });
          }}
        >
          bespin
          {editorSettings.themeName === "bespin" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.darcula, themeName: "darcula" });
          }}
        >
          darcula
          {editorSettings.themeName === "darcula" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.duotoneDark, themeName: "duotoneDark" });
          }}
        >
          duotoneDark
          {editorSettings.themeName === "duotoneDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.duotoneLight, themeName: "duotoneLight" });
          }}
        >
          duotoneLight
          {editorSettings.themeName === "duotoneLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.eclipse, themeName: "eclipse" });
          }}
        >
          eclipse
          {editorSettings.themeName === "eclipse" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.githubDark, themeName: "githubDark" });
          }}
        >
          githubDark
          {editorSettings.themeName === "githubDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.githubLight, themeName: "githubLight" });
          }}
        >
          githubLight
          {editorSettings.themeName === "githubLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.gruvboxDark, themeName: "gruvboxDark" });
          }}
        >
          gruvboxDark
          {editorSettings.themeName === "gruvboxDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.gruvboxLight, themeName: "gruvboxLight" });
          }}
        >
          gruvboxLight
          {editorSettings.themeName === "gruvboxLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.material, themeName: "material" });
          }}
        >
          material
          {editorSettings.themeName === "material" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.materialDark, themeName: "materialDark" });
          }}
        >
          materialDark
          {editorSettings.themeName === "materialDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.materialLight, themeName: "materialLight" });
          }}
        >
          materialLight
          {editorSettings.themeName === "materialLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.noctisLilac, themeName: "noctisLilac" });
          }}
        >
          noctisLilac
          {editorSettings.themeName === "noctisLilac" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.nord, themeName: "nord" });
          }}
        >
          nord
          {editorSettings.themeName === "nord" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.okaidia, themeName: "okaidia" });
          }}
        >
          okaidia
          {editorSettings.themeName === "okaidia" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.solarizedDark, themeName: "solarizedDark" });
          }}
        >
          solarizedDark
          {editorSettings.themeName === "solarizedDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.solarizedLight, themeName: "solarizedLight" });
          }}
        >
          solarizedLight
          {editorSettings.themeName === "solarizedLight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.sublime, themeName: "sublime" });
          }}
        >
          sublime
          {editorSettings.themeName === "sublime" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNight, themeName: "tokyoNight" });
          }}
        >
          tokyoNight
          {editorSettings.themeName === "tokyoNight" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNightDay, themeName: "tokyoNightDay" });
          }}
        >
          tokyoNightDay
          {editorSettings.themeName === "tokyoNightDay" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNightStorm, themeName: "tokyoNightStorm" });
          }}
        >
          tokyoNightStorm
          {editorSettings.themeName === "tokyoNightStorm" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.vscodeDark, themeName: "vscodeDark" });
          }}
        >
          vscodeDark
          {editorSettings.themeName === "vscodeDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.xcodeDark, themeName: "xcodeDark" });
          }}
        >
          xcodeDark
          {editorSettings.themeName === "xcodeDark" && <FaCheck className="text-accent1"/>}
        </button>
        <button
          className="flex items-center justify-between w-full text-left px-3 rounded-md hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.xcodeLight, themeName: "xcodeLight" });
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
