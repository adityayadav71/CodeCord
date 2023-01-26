import { React, useState } from "react";
import Navbar from "../HomePage/Navbar";
import Copyright from "../../utilities/Copyright";
import LiveRooms from "../Rooms/LiveRooms";
import UpcomingContest from "./UpcomingContest";
import PastContest from "./PastContest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Contest = (props) => {
  const [pastTabIsActive, setPastTabIsActive] = useState(true);

  const changePastTabActiveStatus = () => {
    setPastTabIsActive(!pastTabIsActive);
  };

  return (
    <div className="flex flex-col h-full grow items-center">
      <Navbar />
      <div className="flex flex-row w-full px-6 py-4 grow gap-x-6 max-w-[2560px]">
        <div className="flex flex-col grow">
          <h1 className="text-4xl font-bold mb-12">Upcoming Contests</h1>
          <Swiper className="relative ml-0 h-40 w-[753px] mb-9" navigation={true} modules={[Navigation]} spaceBetween={12} slidesPerView={2}>
            <SwiperSlide>
              <UpcomingContest name="Weekly Contest-1" timeStamp="15th Jan 2023 8:00 AM GMT+5:30" live="true" />
            </SwiperSlide>
            <SwiperSlide>
              <UpcomingContest name="Weekly Contest-2" timeStamp="16th Jan 2023 8:00 AM GMT+5:30" />
            </SwiperSlide>
          </Swiper>
          <div className="flex flex-row items-center gap-x-3 mb-6">
            <button className={`${pastTabIsActive ? "text-white bg-accent3" : "text-grey1"} transition-all duration-300 hover:text-white p-3 text-lg rounded-lg`} onClick={changePastTabActiveStatus}>
              Past Contests
            </button>
            <button className={`${pastTabIsActive ? "text-grey1" : "text-white bg-accent3"} transition-all duration-300 hover:text-white p-3 text-lg rounded-lg`} onClick={changePastTabActiveStatus}>
              My Contests
            </button>
          </div>
          {/* Render Contests based on pastTabIsActive */}
          {pastTabIsActive === true ? (
            <div className="flex flex-col bg-secondary rounded-xl p-3 w-[753px] grow">
              <PastContest name="Weekly Contest 2" timeStamp="January 8 2023 | 8:00 AM" />
              <PastContest name="Weekly Contest 1" timeStamp="January 1 2023 | 8:00 AM" />
            </div>
          ) : (
            <div className="flex flex-col bg-secondary rounded-xl p-3 max-h-[720px] w-[753px] grow">
              <PastContest name="My Contest 2" timeStamp="January 8 2023 | 8:00 AM" />
              <PastContest name="My Contest 1" timeStamp="January 1 2023 | 8:00 AM" />
            </div>
          )}
        </div>
        <LiveRooms />
      </div>
      <Copyright />
    </div>
  );
};

export default Contest;
