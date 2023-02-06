import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";

const Footer = (props) => {
  return (
    <div className="flex text-grey1 px-9 h-64 mt-11 mb-11">
      <div className="mr-auto min-w-[30%]">
        <img className="mb-5" src={logo} alt="codecord_logo" />
        <a href="mailto:codecordSupport@gmail.com">codecordSupport@gmail.com</a>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">About</h3>
        <ul>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li>How it works</li>
          </a>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li>Contact</li>
          </a>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li>Contribute</li>
          </a>
        </ul>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">Features</h3>
        <ul>
          <li>
            <Link to="/app/problem" className="hover:text-accent1 transition-all duration-300">
              Problems
            </Link>
          </li>
          <li>
            <Link to="/app/problem" className="hover:text-accent1 transition-all duration-300">
              Contests
            </Link>
          </li>
          <li>
            <Link to="/app/problem" className="hover:text-accent1 transition-all duration-300">
              Create a Room
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">Socials</h3>
        <ul>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li className="flex flex-row gap-x-2 items-center">
              <FaGithub />
              GitHub
            </li>
          </a>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li className="flex flex-row gap-x-2 items-center">
              <FaLinkedin />
              LinkedIn
            </li>
          </a>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li className="flex flex-row gap-x-2 items-center">
              <FaTwitter />
              Twitter
            </li>
          </a>
          <a className="hover:text-accent1 transition-all duration-300" href="#">
            <li className="flex flex-row gap-x-2 items-center">
              <FaInstagram />
              Instagram
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
