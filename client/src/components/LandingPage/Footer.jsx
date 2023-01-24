import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/svg/logo.svg";

const Footer = (props) => {
  return (
    <div className="flex text-grey1 px-9 h-64 mt-11">
      <div className="mr-auto min-w-[30%]">
        <img className="mb-5" src={logo} alt="codecord_logo" />
        <a href="mailto:codecordSupport@gmail.com">codecordSupport@gmail.com</a>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">About</h3>
        <ul>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>How it works</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>Contact</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>Contribue</li></a>
        </ul>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">Features</h3>
        <ul>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>Problems</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>Contests</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li>Create a Room</li></a>
        </ul>
      </div>
      <div className="w-80">
        <h3 className="text-lg mb-6 font-bold text-white">Socials</h3>
        <ul>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li className="flex flex-row gap-x-2 items-center"><FaGithub/>GitHub</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li className="flex flex-row gap-x-2 items-center"><FaLinkedin/>LinkedIn</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li className="flex flex-row gap-x-2 items-center"><FaTwitter/>Twitter</li></a>
          <a className="hover:text-accent1 transition-all duration-300" href="#"><li className="flex flex-row gap-x-2 items-center"><FaInstagram/>Instagram</li></a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
