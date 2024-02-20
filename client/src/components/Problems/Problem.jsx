import { React, useContext, useEffect } from "react";
import { FaCheckCircle, FaRegFileCode } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";

const Problem = ({ selected, setSelected, unselected, setUnSelected, number, name, acceptance, difficulty, submissions, userSubmissions, status, filterInsideModal }) => {
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

  const handleSelectProblem = (e) => {
    if (selected.length < 4 && e.target.checked) {
      setSelected((prevSelected) => (!prevSelected.includes(number) ? [...prevSelected, number] : prevSelected));
    } else if (!e.target.checked) {
      setSelected((prevSelected) => prevSelected.filter((problem) => problem !== number));
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".problem-selected");
    if (unselected) {
      Array.from(inputs).forEach((input) => {
        input.checked = false;
      });
      setUnSelected(false);
    }
    if (selected?.length < 4) {
      Array.from(inputs).forEach((input) => {
        input.disabled = false;
      });
    } else {
      Array.from(inputs).forEach((input) => {
        if (!input.checked) {
          input.disabled = true;
        }
      });
    }
  }, [selected, unselected]);

  return (
    <div className="w-full even:bg-hover">
      <div className="flex flex-row items-center gap-3 p-3 text-lg">
        {filterInsideModal && <input type="checkbox" onClick={handleSelectProblem} className="problem-selected hover:cursor-pointer w-20 flex flex-row gap-x-3" />}
        {!filterInsideModal && (
          <div className="w-20">{status === "solved" ? <FaCheckCircle className="text-green-500" /> : status === "attempted" ? <RiPulseLine className="text-mediumYellow" /> : ""}</div>
        )}
        <div className="grow min-w-[18rem] truncate">
          <Link to={`/app/problem/${name.toLowerCase().replace(/\s/g, "-")}`} className="hover:text-accent1">
            {number}. {name}
          </Link>
        </div>
        <div className="w-32">{acceptance}%</div>
        <div className={`w-32 ${difficulty === "easy" ? "text-easyGreen" : difficulty === "medium" ? "text-mediumYellow" : "text-hardRed"}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
        <p className="hideScrollbar w-32 flex flex-row gap-x-3">{submissions}</p>
        {isLoggedIn && !filterInsideModal && (
          <Swiper className="hideScrollbar w-32 flex flex-row gap-x-3" spaceBetween={12} slidesPerView={6}>
            {loadSubmissions()}
          </Swiper>
        )}

        {filterInsideModal && (
          <div className="w-20">{status === "solved" ? <FaCheckCircle className="text-green-500" /> : status === "attempted" ? <RiPulseLine className="text-mediumYellow" /> : ""}</div>
        )}
      </div>
    </div>
  );
};

export default Problem;
