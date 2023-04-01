import { React, useContext, useEffect } from "react";
import { FaCheckCircle, FaRegFileCode } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";

const Problem = ({
  number,
  name,
  acceptance,
  difficulty,
  submissions,
  userSubmissions,
  status,
  type,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const loadSubmissions = () => {
    let submissions = [];
    for (let i = userSubmissions; i > 0; i--) {
      submissions.push(
        <SwiperSlide key={i}>
          <a href="#" className="hover:text-accent1">
            <FaRegFileCode />
          </a>
        </SwiperSlide>
      );
    }
    return submissions;
  };
  return (
    <div className="odd:bg-hover" key={number}>
      <div className="flex flex-row items-center p-3 text-lg">
        <div className="w-20">
          {status === "solved" ? (
            <FaCheckCircle className="text-green" />
          ) : status === "attempted" ? (
            <RiPulseLine className="text-mediumYellow" />
          ) : (
            ""
          )}
        </div>
        <div className="grow">
          <Link
            to={`/app/problem/${name.toLowerCase().replace(/\s/g, "-")}`}
            className="hover:text-accent1"
          >
            {number}. {name}
          </Link>
        </div>
        <div className="w-40">{acceptance}%</div>
        <div
          className={`w-40 font-bold ${
            difficulty === "easy"
              ? "text-easyGreen"
              : difficulty === "medium"
              ? "text-mediumYellow"
              : "text-hardRed"
          }`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
        <p className="hideScrollbar w-40 flex flex-row gap-x-3">
          {submissions}
        </p>
        {isLoggedIn && type !== "select" && (
          <Swiper
            className="hideScrollbar w-40 flex flex-row gap-x-3"
            spaceBetween={12}
            slidesPerView={6}
          >
            {loadSubmissions()}
          </Swiper>
        )}
        {type === "select" && (
          <input
            type="checkbox"
            className="problem-selected w-20 flex flex-row gap-x-3"
          />
        )}
      </div>
    </div>
  );
};

export default Problem;
