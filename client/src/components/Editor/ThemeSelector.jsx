import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import * as themes from "@uiw/codemirror-themes-all";

const ThemeSelector = ({ editorSettings, setEditorSettings }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
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
    <div className="relative dropdown">
      <button className="flex flex-row w-40 items-center justify-between gap-x-3 px-3 py-1 bg-accent3 hover:bg-lightPrimary rounded-lg" onClick={() => setThemesOpen((prev) => !prev)}>
        <p>{editorSettings.themeName}</p>
        <FaAngleDown className={`${themesOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute z-50 shadow shadow-dropDown ${themesOpen ? "block" : "hidden"} top-12 left-0 w-fit rounded-lg bg-accent3 hideScrollbar overflow-scroll h-40`}>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.dracula, themeName: "default" });
          }}
        >
          default
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.abcdef, themeName: "abcdef" });
          }}
        >
          abcdef
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.androidstudio, themeName: "androidstudio" });
          }}
        >
          androidstudio
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.atomone, themeName: "atomone" });
          }}
        >
          atomone
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.aura, themeName: "aura" });
          }}
        >
          aura
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.bbedit, themeName: "bbedit" });
          }}
        >
          bbedit
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.bespin, themeName: "bespin" });
          }}
        >
          bespin
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.darcula, themeName: "darcula" });
          }}
        >
          darcula
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.duotoneDark, themeName: "duotoneDark" });
          }}
        >
          duotoneDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.duotoneLight, themeName: "duotoneLight" });
          }}
        >
          duotoneLight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.eclipse, themeName: "eclipse" });
          }}
        >
          eclipse
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.githubDark, themeName: "githubDark" });
          }}
        >
          githubDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.githubLight, themeName: "githubLight" });
          }}
        >
          githubLight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.gruvboxDark, themeName: "gruvboxDark" });
          }}
        >
          gruvboxDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.gruvboxLight, themeName: "gruvboxLight" });
          }}
        >
          gruvboxLight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.material, themeName: "material" });
          }}
        >
          material
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.materialDark, themeName: "materialDark" });
          }}
        >
          materialDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.materialLight, themeName: "materialLight" });
          }}
        >
          materialLight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.noctisLilac, themeName: "noctisLilac" });
          }}
        >
          noctisLilac
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.nord, themeName: "nord" });
          }}
        >
          nord
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.okaidia, themeName: "okaidia" });
          }}
        >
          okaidia
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.solarizedDark, themeName: "solarizedDark" });
          }}
        >
          solarizedDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.solarizedLight, themeName: "solarizedLight" });
          }}
        >
          solarizedLight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.sublime, themeName: "sublime" });
          }}
        >
          sublime
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNight, themeName: "tokyoNight" });
          }}
        >
          tokyoNight
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNightDay, themeName: "tokyoNightDay" });
          }}
        >
          tokyoNightDay
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.tokyoNightStorm, themeName: "tokyoNightStorm" });
          }}
        >
          tokyoNightStorm
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.vscodeDark, themeName: "vscodeDark" });
          }}
        >
          vscodeDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.xcodeDark, themeName: "xcodeDark" });
          }}
        >
          xcodeDark
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setThemesOpen(false);
            setEditorSettings({ ...editorSettings, theme: themes.xcodeLight, themeName: "xcodeLight" });
          }}
        >
          xcodeLight
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
