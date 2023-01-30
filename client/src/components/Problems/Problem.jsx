import React from "react";
import { FaCheckCircle, FaRegFileCode } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Problem = ({ number, name, acceptance, difficulty, submissionCount, status }) => {
  const loadSubmissions = () => {
    let submissions = [];
    for (let i = submissionCount; i > 0; i--) {
      submissions.push(
        <SwiperSlide>
          <a href="#" className="hover:text-accent1">
            <FaRegFileCode />
          </a>
        </SwiperSlide>
      );
    }
    return submissions;
  };
  return (
    <div className="flex flex-row items-center p-3 text-lg odd:bg-hover">
      <div className="w-20">{status === "solved" ? <FaCheckCircle className="text-green" /> : status === "attempted" ? <RiPulseLine className="text-mediumYellow" /> : ""}</div>
      <div className="grow">
        <a href="#" className="hover:text-accent1">
          {number}. {name}
        </a>
      </div>
      <div className="w-40">{acceptance}%</div>
      <div className={`w-40 font-bold ${difficulty === "easy" ? "text-easyGreen" : difficulty === "medium" ? "text-mediumYellow" : "text-hardRed"}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </div>
      <Swiper className="hideScrollbar w-40 flex flex-row gap-x-3" spaceBetween={12} slidesPerView={6}>
        {loadSubmissions()}
      </Swiper>
    </div>
  );
};

export default Problem;
