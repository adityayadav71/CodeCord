import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import * as themes from "@uiw/codemirror-themes-all";

const ThemeSelector = ({ setEditorTheme }) => {
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
        <p>Theme</p>
        <FaAngleUp className={`${themesOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute ${themesOpen ? "block" : "hidden"} top-12 left-0 w-fit rounded-lg bg-accent3 hideScrollbar overflow-scroll h-40`}>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.dracula)}>
          default
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.abcdef)}>
          abcdef
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.androidstudio)}>
          androidstudio
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.atomone)}>
          atomone
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.aura)}>
          aura
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.bbedit)}>
          bbedit
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.bespin)}>
          bespin
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.darcula)}>
          darcula
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.duotoneDark)}>
          duotoneDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.duotoneLight)}>
          duotoneLight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.eclipse)}>
          eclipse
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.githubDark)}>
          githubDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.githubLight)}>
          githubLight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.gruvboxDark)}>
          gruvboxDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.gruvboxLight)}>
          gruvboxLight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.material)}>
          material
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.materialDark)}>
          materialDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.materialLight)}>
          materialLight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.noctisLilac)}>
          noctisLilac
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.nord)}>
          nord
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.okaidia)}>
          okaidia
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.solarizedDark)}>
          solarizedDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.solarizedLight)}>
          solarizedLight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.sublime)}>
          sublime
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNight)}>
          tokyoNight
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNightDay)}>
          tokyoNightDay
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.tokyoNightStorm)}>
          tokyoNightStorm
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.vscodeDark)}>
          vscodeDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.xcodeDark)}>
          xcodeDark
        </button>
        <button className="w-full text-left px-3 hover:bg-lightPrimary" onClick={() => setEditorTheme(themes.xcodeLight)}>
          xcodeLight
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
