import { FaAngleUp } from "react-icons/fa";

const LanguageSelector = ({
  language,
  setLanguage,
  languageOpen,
  setLanguageOpen,
}) => {
  return (
    <div className="relative dropdown">
      <button
        className="flex flex-row items-center justify-between gap-x-3 px-3 py-1 bg-primary hover:bg-lightPrimary rounded-lg"
        onClick={() => setLanguageOpen((prev) => !prev)}
      >
        <p>{language}</p>
        <FaAngleUp className={`${languageOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`language absolute 
                ${languageOpen ? "block" : "hidden"} 
                bottom-12 left-0 w-fit rounded-lg bg-primary hideScrollbar overflow-scroll h-40`}
      >
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguage("Java");
          }}
        >
          Java
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguage("C++");
          }}
        >
          C++
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguage("JavaScript");
          }}
        >
          JavaScript
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguage("Python");
          }}
        >
          Python
        </button>
        <button
          className="w-full text-left px-3 hover:bg-lightPrimary"
          onClick={() => {
            setLanguage("Rust");
          }}
        >
          Rust
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
