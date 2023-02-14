import { React, useState } from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaUsers, FaGlobeAsia, FaProjectDiagram, FaUser } from "react-icons/fa";
import ContestCard from "../Contests/UpcomingContest";
import editorSvg from "../../assets/svg/feature1.svg"
import Tags from "../Problems/Tags";

const Feature = ({
  supTitle,
  TitleHighLight,
  Title,
  color,
  gradient,
  glow,
  list,
  extra,
}) => {
  const listItems = list?.map((item, index) => (
    <li key={index} className="mb-3 text-grey2">
      {item}
    </li>
  ));
  const colorVariants = {
    accent1: "bg-[#0098FA]",
    easyGreen: "bg-[#19EB48]",
    mediumYellow: "bg-[#E2BC1E]",
    feature1: "shadow-[0px_0px_54px_45px_#0098FA]",
    feature2: "shadow-[0px_0px_54px_45px_#19EB48]",
    feature3: "shadow-[0px_0px_54px_45px_#E2BC1E]",
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
    "Sign up for an account": FaUser,
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
      threshold={[0.3]}
      onChange={(inView, entry) => {
        if (inView) {
          setIsInView(true);
        }
      }}
    >
      <section
        className={`flex flex-row 
        ${extra === "SignUp" ? "h-[30rem]" : "h-[60rem]"} 
        gap-x-3 px-9`}
      >
        <aside>
          <div
            className={`relative ml-14 w-4 h-4 transition-all duration-300  
            ${isInView ? colorVariants[color] : ""} 
            ${isInView ? colorVariants[glow] : ""} 
            rounded-full`}
          >
            {Icon ? (
              <Icon
                className={`${
                  isInView ? "animate-fadeIn" : ""
                } opacity-0 absolute text-7xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              />
            ) : null}
          </div>
          <div
            className={`
              ${isInView ? "animate-grow" : ""} 
              z-[-1] ml-14 top-full w-3 rounded 
              ${gradientLookup[gradient]}`}
          ></div>
        </aside>

        <div className="flex flex-col ml-32 w-full h-full">
          <p
            className={`${extra === "SignUp" ? "text-5xl" : "text-4xl"} 
            ${isInView ? "animate-slideOutDelayed" : ""} 
            -translate-x-2 origin-top-right opacity-0 font-bold mb-20`}
          >
            {supTitle}
          </p>
          {extra === "SignUp" ? (
            <Link to="/app/auth/signup">
              <button className="p-4 w-40 text-3xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 hover:shadow hover:shadow-signUp  bg-accent1 text-white font-bold rounded-xl">
                Sign up
              </button>
            </Link>
          ) : (
            <div className="flex flex-col grow">
              <h1
                className={`text-5xl font-bold tracking-wide mb-11 ${
                  isInView ? "animate-slideOut" : ""
                } -translate-x-2 origin-top-right opacity-0`}
              >
                <span className={`${textVariants[color]}`}>
                  {TitleHighLight}
                </span>
                {Title}
              </h1>
              <div className="flex flex-row w-full h-full gap-x-6 justify-content-center items-center">

                <InView
                  as="div"
                  threshold={[1]}
                  onChange={(listInView, entry) => {
                    if (listInView) {
                      setListIsInView(true);
                    }
                  }}
                >
                  <ul
                    className={`
                    ${listIsInView ? "animate-slideOut" : ""} 
                    -translate-x-2 origin-top-right opacity-0 list-outside list-disc ml-6 leading-8 text-2xl grow`}
                  >
                    {listItems}
                  </ul>
                </InView>

                {supTitle === "Collaborate" ? (
                  <img className={`self-start 
                  ${listIsInView ? "animate-slideUp" : ""} 
                  opacity-0 -translate-y-2 shadow-2xl w-[853px] h-[480px]`} src={editorSvg} alt="Room-Feature-UI-Image" />
                ) : null}
                {supTitle === "Compete" ? (
                  <div className="flex flex-row items-center justify-center w-full h-full grow">
                    <div
                      className={`self-start 
                      ${listIsInView ? "animate-slideUp" : ""} 
                      opacity-0 -translate-y-2`}
                    >
                      <ContestCard
                        style={{
                          marginLeft: 80,
                          marginBottom: 10,
                          pointerEvents: "none",
                        }}
                        name="Weekly Contest 1"
                        timeStamp="15th Jan 2023 8:00 AM GMT+5:30"
                        live="true"
                      />
                      <ContestCard
                        style={{ marginRight: 80, pointerEvents: "none" }}
                        name="Weekly Contest 2"
                        timeStamp="16th Jan 2023 8:00 AM GMT+5:30"
                        live="false"
                      />
                    </div>
                  </div>
                ) : null}
                {supTitle === "Solve" ? (
                  <div
                    className={`flex flex-row pt-44 justify-center w-full h-full
                    ${listIsInView ? "animate-slideUp" : ""} 
                    opacity-0 -translate-y-2 grow`}
                  >
                    <div className="relative w-1/2 h-1/2">
                      <Tags
                        disableEvents={true}
                        isTagsActive={() => null}
                        activeTags={() => null}
                        setActiveTags={() => null}
                        handleClick={() => null}
                      />
                    </div>
                  </div>
                ) : null}

              </div>
            </div>
          )}
        </div>
      </section>
    </InView>
  );
};

export default Feature;
