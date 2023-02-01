import React from "react";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaAngleDown, FaCheck } from "react-icons/fa";

const pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(20);
  const [isLimitChangerActive, setLimitChangerActive] = useState();
  const setLimit = (e) => {
    setLimitChangerActive(false);
    setPerPageLimit(e.currentTarget.dataset.value);
  };
  const pageButtons = [];
  const setPageButtons = () => {
    for (let i = 1; i < 11; i++) {
      pageButtons.push(
        <button
          className={`flex flex-row items-center justify-center ${currentPage === i ? "bg-accent1" : "bg-accent2"} p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
  };
  setPageButtons();
  const totalPages = 10;
  const nextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage - 1 >= 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".limit")) {
        setLimitChangerActive(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="flex flex-row p-3 gap-x-3 pl-20 bg-secondary w-full rounded-xl select-none">
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1 mr-6" onClick={prevPage}>
        <FaArrowLeft />
      </div>
      {pageButtons}
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1 ml-6" onClick={nextPage}>
        <FaArrowRight />
      </div>
      <div className="limit relative ml-auto">
        <div
          className="flex flex-row items-center justify-center h-full bg-accent2 gap-x-3 px-3 text-white rounded-xl hover:cursor-pointer hover:bg-accent1"
          onClick={() => setLimitChangerActive((prev) => !prev)}
        >
          {perPageLimit} / Page <FaAngleDown />
        </div>
        <div
          className={`absolute transition-all duration-100 ${
            isLimitChangerActive ? "z-20  opacity-1 scale-100" : "opacity-0 scale-0"
          } bottom-12 shadow shadow-dropDown left-0 p-3 w-40 hover:cursor-pointer bg-secondary rounded-xl`}
        >
          <div className="flex flex-row items-center justify-between hover:bg-accent3 mb-3 rounded-lg px-3 py-1" data-value="20" onClick={setLimit}>
            20 / Page
          </div>
          <div className="flex flex-row items-center justify-between hover:bg-accent3 mb-3 rounded-lg px-3 py-1" data-value="50" onClick={setLimit}>
            50 / Page
          </div>
          <div className="flex flex-row items-center justify-between hover:bg-accent3 rounded-lg px-3 py-1" data-value="100" onClick={setLimit}>
            100 / Page
          </div>
        </div>
      </div>
    </div>
  );
};

export default pagination;
