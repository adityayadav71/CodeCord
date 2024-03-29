import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/svg/logo.svg";

const Footer = (props) => {
  return (
    <div className="flex sm:flex-row flex-col gap-12 text-grey1 px-9 h-64 mt-11 mb-96">
      <div className="mr-auto min-w-[30%]">
        <img className="mb-5" src={logo} alt="codecord_logo" />
        <a href="mailto:codecordSupport@gmail.com">codecordSupport@gmail.com</a>
      </div>
      <div className="flex gap-6 leading-none w-full">
        <div className="lg:w-80 md:w-64 sm:w-52 w-40">
          <h3 className="text-lg mb-6 font-bold text-white">About</h3>
          <ul>
            <li className="mb-4">
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="#">
                Developers
              </a>
            </li>
            <li className="mb-4">
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="#">
                Contact
              </a>
            </li>
            <li className="mb-4">
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="https://github.com/adityayadav71/CodeCord">
                Contribute
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-80 md:w-64 sm:w-52 w-40">
          <h3 className="text-lg mb-6 font-bold text-white">Features</h3>
          <ul>
            <li className="mb-4">
              <Link to="/app/problem" className="hover:text-accent1 transition-all duration-300">
                Problems
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/app/contest" className="hover:text-accent1 transition-all duration-300">
                Contests
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/app/rooms" className="hover:text-accent1 transition-all duration-300">
                Public Rooms
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:w-80 md:w-64 sm:w-52 w-40">
          <h3 className="text-lg mb-6 font-bold text-white">Socials</h3>
          <ul>
            <li className="flex flex-row mb-4 gap-x-2 items-center">
              <FaGithub />
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="https://github.com/adityayadav71/CodeCord">
                GitHub
              </a>
            </li>
            <li className="flex flex-row mb-4 gap-x-2 items-center">
              <FaLinkedin />
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="#">
                LinkedIn
              </a>
            </li>
            <li className="flex flex-row mb-4 gap-x-2 items-center">
              <FaTwitter />
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="#">
                Twitter
              </a>
            </li>
            <li className="flex flex-row mb-4 gap-x-2 items-center">
              <FaInstagram />
              <a target="_blank" className="hover:text-accent1 transition-all duration-300" href="#">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
