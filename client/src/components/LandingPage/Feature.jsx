import { React, useState } from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaUsers, FaGlobeAsia, FaProjectDiagram, FaUser } from "react-icons/fa";
import editorSvg from "/feature1.png";
import contestSvg from "/svg/feature2.svg";
import tagsFilterSvg from "/svg/feature3.svg";

const Feature = ({ supTitle, TitleHighLight, Title, color, gradient, glow, list, extra }) => {
  const listItems = list?.map((item, index) => (
    <li key={index} className="mb-3 text-grey2">
      {item}
    </li>
  ));

  const getBoxShadow = (isInView, color, glow) => {
    if (isInView) {
      if (color)
        switch (color) {
          case "accent1":
            return "bg-[#0098FA]";
          case "easyGreen":
            return "bg-[#19EB48]";
          case "mediumYellow":
            return "bg-[#E2BC1E]";
        }

      if (glow)
        if (window.innerWidth <= 640) {
          switch (glow) {
            case "feature1":
              return "shadow-[0px_0px_36px_24px_#0098FA]";
            case "feature2":
              return "shadow-[0px_0px_36px_24px_#19EB48]";
            case "feature3":
              return "shadow-[0px_0px_36px_24px_#E2BC1E]";
          }
        } else if (window.innerWidth <= 768) {
          switch (glow) {
            case "feature1":
              return "shadow-[0px_0px_40px_28px_#0098FA]";
            case "feature2":
              return "shadow-[0px_0px_40px_28px_#19EB48]";
            case "feature3":
              return "shadow-[0px_0px_40px_28px_#E2BC1E]";
          }
        } else if (window.innerWidth >= 1024) {
          switch (glow) {
            case "feature1":
              return "shadow-[0px_0px_54px_45px_#0098FA]";
            case "feature2":
              return "shadow-[0px_0px_54px_45px_#19EB48]";
            case "feature3":
              return "shadow-[0px_0px_54px_45px_#E2BC1E]";
          }
        }
    } else return "none";
  };

  const textVariants = {
    accent1: "text-[#0098FA]",
    easyGreen: "text-[#19EB48]",
    mediumYellow: "text-[#E2BC1E]",
  };
  const iconLookup = {
    Collaborate: FaUsers,
    Compete: FaGlobeAsia,
    Solve: FaProjectDiagram,
    "Sign up for CodeCord": FaUser,
  };
  const gradientLookup = {
    featureGradient1: "bg-gradient-to-b from-accent1 to-easyGreen",
    featureGradient2: "bg-gradient-to-b from-easyGreen to-mediumYellow",
    featureGradient3: "bg-gradient-to-b from-mediumYellow to-accent1",
    featureGradient4: "bg-gradient-to-b from-accent1 to-primary",
  };
  const Icon = iconLookup[supTitle];
  const [isInView, setIsInView] = useState(false);
  const [listIsInView, setListIsInView] = useState(false);

  return (
    <InView
      as="div"
      threshold={[0.1]}
      onChange={(inView) => {
        if (inView) setIsInView(true);
      }}
    >
      <section
        className={`flex flex-row
        ${extra === "SignUp" ? "h-[30rem]" : "sm:h-[60rem] h-[64rem]"} 
        gap-x-3 sm:px-9 px-6`}
        id={supTitle}
      >
        <aside>
          <div
            className={`relative lg:ml-14 ml-4 w-4 h-4 transition-all duration-300  
            ${isInView ? `${getBoxShadow(isInView, color, "")}` : ""} 
            ${isInView ? `${getBoxShadow(isInView, "", glow)}` : ""} 
            rounded-full`}
          >
            {Icon ? <Icon className={`${isInView ? "animate-fadeIn" : ""} opacity-0 absolute lg:text-7xl text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} /> : null}
          </div>
          <div
            className={`
              ${isInView ? "animate-grow" : ""} 
              z-[-1] lg:ml-14 ml-5 lg:w-3 w-1 top-full rounded 
              ${gradientLookup[gradient]}`}
          ></div>
        </aside>

        <div className="flex flex-col lg:ml-28 ml-10 w-full h-full">
          <p
            className={`${extra === "SignUp" ? "lg:text-5xl md:text-4xl text-3xl" : "lg:text-4xl text-3xl"} 
            ${isInView ? "animate-slideOutDelayed" : ""} 
            -mt-2 -translate-x-2 tracking-wide origin-top-right opacity-0 font-bold mb-20`}
          >
            {supTitle}
          </p>
          {extra === "SignUp" ? (
            <Link to="/app/auth/signup">
              <button className="px-6 py-4 sm:w-60 w-full text-3xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 hover:shadow hover:shadow-signUp  bg-accent1 text-white font-bold rounded-xl">
                Sign up
              </button>
            </Link>
          ) : (
            <div className="flex flex-col grow">
              <h1 className={`lg:text-5xl md:text-4xl text-3xl sm:font-bold tracking-tight mb-11 ${isInView ? "animate-slideOut" : ""} -translate-x-2 origin-top-right opacity-0`}>
                <span className={`${textVariants[color]}`}>{TitleHighLight}</span>
                {Title}
              </h1>
              <div className="flex sm:flex-row flex-col w-full h-full gap-6 items-center justify-content-center">
                <InView
                  as="div"
                  threshold={[0.5]}
                  onChange={(listInView) => {
                    if (listInView) setListIsInView(true);
                  }}
                >
                  <ul
                    className={`
                    ${listIsInView ? "animate-slideOut" : ""} 
                    min-w-1/2 mb-20 self-center -translate-x-2 origin-top-right text-left opacity-0 list-outside list-disc ml-6 leading-7 lg:text-2xl md:text-xl sm:text-lg text-xl tracking-wide`}
                  >
                    {listItems}
                  </ul>
                </InView>

                {supTitle === "Collaborate" && (
                  <img
                    className={`
                        ${listIsInView ? "animate-slideUp" : ""} lg:max-w-4xl sm:max-w-xl sm:mb-0 mb-6 opacity-0 shadow-2xl sm:order-1 -order-1`}
                    src={editorSvg}
                    alt="Room-Feature-UI-Image"
                  />
                )}
                {supTitle === "Compete" && (
                  <img
                    className={`
                        ${listIsInView ? "animate-slideUp" : ""} lg:max-w-4xl sm:max-w-xl sm:mb-0 mb-6 opacity-0 -translate-y-2 shadow-2xl -order-1`}
                    src={contestSvg}
                    alt="Contest-Feature-UI-Image"
                  />
                )}
                {supTitle === "Solve" && (
                  <img
                    className={`
                      ${listIsInView ? "animate-slideUp" : ""} lg:max-w-4xl sm:max-w-xl sm:mb-0 mb-6 opacity-0 -translate-y-2 shadow-2xl sm:order-1 -order-1`}
                    src={tagsFilterSvg}
                    alt="Filter-Feature-UI-Image"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </InView>
  );
};

export default Feature;
