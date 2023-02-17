import { Link } from "react-router-dom";

const StickyNavbar = ({ activeSection }) => {
  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="drop-shadow-lg transition duration-300 fixed top-0 left-0 flex flex-row gap-x-3 items-center justify-between bg-primary w-full">
      <ul className="flex flex-row items-center text-md ml-6">
        <li
          className="m-4 p-2 relative hover:cursor-pointer"
          onClick={() => handleScroll("Collaborate")}
        >
          Collaborate
          <div
            className={`absolute ${
              activeSection === "Collaborate"
                ? "left-0 bottom-0 w-full h-[1px] bg-white animate-expandBorder"
                : ""
            }`}
          ></div>
        </li>
        <li
          className="m-4 p-2 relative hover:cursor-pointer"
          onClick={() => handleScroll("Compete")}
        >
          Compete
          <div
            className={`absolute ${
              activeSection === "Compete"
                ? "left-0 bottom-0 w-full h-[1px] bg-white animate-expandBorder"
                : ""
            }`}
          ></div>
        </li>
        <li
          className="m-4 p-2 relative hover:cursor-pointer"
          onClick={() => handleScroll("Solve")}
        >
          Solve
          <div
            className={`absolute ${
              activeSection === "Solve"
                ? "left-0 bottom-0 w-full h-[1px] bg-white animate-expandBorder"
                : ""
            }`}
          ></div>
        </li>
      </ul>
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        <Link
          to="/app/auth/login"
          className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Login
        </Link>
        <Link
          to="/app/auth/signup"
          className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default StickyNavbar;
