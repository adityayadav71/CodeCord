import React from "react";
import { FaUsers, FaGlobeAsia, FaProjectDiagram, FaUser } from "react-icons/fa";

const Feature = (props) => {
  const listItems = props?.list?.map((item) => {
    return <li className="mb-3 text-grey2">{item}</li>;
  });
  return (
    <div className="flex flex-row h-screen gap-x-3 px-9">
      <div>
        <div className={`relative ml-14 w-5 h-5 rounded-full bg-accent1}`}>
          {props?.supTitle === "Collaborate" ? <FaUsers className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
          {props?.supTitle === "Compete" ? <FaGlobeAsia className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
          {props?.supTitle === "Solve" ? <FaProjectDiagram className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
          {props?.supTitle === "Sign up for an account" ? <FaUser className="absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
        </div>
        <div className={`z-[-1] ml-14 top-full w-3 h-full bg-gradient-to-b from-accent1 to-easyGreen`}></div>
      </div>
      <div className="flex flex-col ml-14 w-full">
        <p className={`text-${props?.extra === "SignUp" ? "5xl" : "3xl"} font-bold mb-28`}>{props?.supTitle}</p>
        {props?.extra === "SignUp" ? (
          <button className="p-4 w-40 text-3xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 hover:shadow-feature1 hover:shadow bg-accent1 text-white font-bold rounded-xl">
            Sign up
          </button>
        ) : (
          <div className="flex flex-col grow">
            <h1 className="text-5xl font-bold tracking-wide mb-11">
              <span className={`text-accent1`}>{props?.TitleHighLight}</span>
              {props?.Title}
            </h1>
            <div className="flex flex-row grow gap-x-6 items-center">
              <ul className="list-outside list-disc ml-6 leading-8 text-2xl">{listItems}</ul>
              <div className="w-full h-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;
