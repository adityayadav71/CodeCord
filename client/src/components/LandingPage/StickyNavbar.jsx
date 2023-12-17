import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useContext } from "react";
import { MobileContext } from "../../layouts/LandingLayout";

const Section = ({ name, activeSection, handleScroll }) => {
  const activeTextColor = activeSection === name ? (name === "Collaborate" ? "text-accent1" : name === "Compete" ? "text-easyGreen" : "text-mediumYellow") : "text-white";
  return (
    <li className={`m-4 pt-2 px-2 pb-4 relative hover:text-accent1 ${activeTextColor} transition-all duration-300 hover:cursor-pointer`} onClick={() => handleScroll(name)}>
      {name}
      <div className={`absolute ${activeSection === name ? "left-0 bottom-0 w-full h-[1px] bg-white animate-expandBorder" : ""}`}></div>
    </li>
  );
};

const StickyNavbar = ({ activeSection }) => {
  const { handleClick } = useContext(MobileContext);

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="mx-auto drop-shadow-lg animate-fadeIn transition duration-300 fixed top-0 flex flex-row gap-x-3 items-center justify-between bg-primary w-full">
      <ul className="flex flex-row items-center text-xl ml-6">
        <Section name={"Collaborate"} activeSection={activeSection} handleScroll={handleScroll} />
        <Section name={"Compete"} activeSection={activeSection} handleScroll={handleScroll} />
        <Section name={"Solve"} activeSection={activeSection} handleScroll={handleScroll} />
      </ul>
      <IoMenu className="sm:hidden text-4xl mr-6" onClick={handleClick} />
      <div className="sm:flex flex-row items-center hidden gap-x-6 ml-auto mr-2">
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
