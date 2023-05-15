import { useContext, useEffect, useState } from "react";
import { ProblemContext } from "./index";
import { FaChevronRight, FaAngleDown, FaCheck } from "react-icons/fa";
import { getPreviousSubmissions } from "../../api/problemDataAPI";

const Submissions = ({ handleSubmissionDisplay }) => {
  const { activeProblem } = useContext(ProblemContext);
  const [submissions, setSubmissions] = useState([]);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [filter, setFilter] = useState({
    status: "",
    language: "",
  });
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".language-dropdown")) {
        setLanguageOpen(false);
      }
      if (!event.target.closest(".status-dropdown")) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const submissions = await getPreviousSubmissions(activeProblem._id);
      setSubmissions(submissions);
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 p-6">
        <div className="relative w-full status-dropdown">
          <button
            className="flex flex-row items-center justify-between w-full gap-x-3 p-3 bg-secondary hover:bg-lightPrimary rounded-lg"
            onClick={() => setStatusOpen((prev) => !prev)}
          >
            <p>{filter.status || "All statuses"}</p>
            <FaAngleDown className={`${statusOpen ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`status absolute z-50 p-2
            ${statusOpen ? "block" : "hidden"} 
            top-16 left-0 rounded-lg bg-secondary hideScrollbar overflow-scroll h-44 w-full`}
          >
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({ ...filter, status: "" });
              }}
            >
              All statuses
              {filter.status === "" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({ ...filter, status: "Accepted" });
              }}
            >
              Accepted
              {filter.status === "Accepted" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({ ...filter, status: "Wrong Answer" });
              }}
            >
              Wrong Answer
              {filter.status === "Wrong Answer" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({
                  ...filter,
                  status: "Time Limit Exceeded",
                });
              }}
            >
              Time Limit Exceeded
              {filter.status === "Time Limit Exceeded" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({ ...filter, status: "Compilation Error" });
              }}
            >
              Compilation Error
              {filter.status === "Compilation Error" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setStatusOpen(false);
                setFilter({ ...filter, status: "Runtime Error" });
              }}
            >
              Runtime Error
              {filter.status === "Runtime Error" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
          </div>
        </div>
        <div className="relative w-full language-dropdown">
          <button
            className="flex flex-row items-center justify-between w-full gap-x-3 p-3 bg-secondary hover:bg-lightPrimary rounded-lg"
            onClick={() => setLanguageOpen((prev) => !prev)}
          >
            <p>{filter.language || "All languages"}</p>
            <FaAngleDown className={`${languageOpen ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`language absolute z-50 p-2
            ${languageOpen ? "block" : "hidden"}
            top-16 left-0 rounded-lg bg-secondary hideScrollbar overflow-scroll h-44 w-full`}
          >
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({ ...filter, language: "" });
              }}
            >
              All languages
              {filter.language === "" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({ ...filter, language: "Java" });
              }}
            >
              Java
              {filter.language === "Java" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({ ...filter, language: "C++" });
              }}
            >
              C++
              {filter.language === "C++" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({
                  ...filter,
                  language: "JavaScript",
                });
              }}
            >
              JavaScript
              {filter.language === "JavaScript" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({ ...filter, language: "Python" });
              }}
            >
              Python
              {filter.language === "Python" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
            <button
              className="w-full flex items-center text-left px-3 py-1 rounded-lg hover:bg-lightPrimary"
              onClick={() => {
                setLanguageOpen(false);
                setFilter({ ...filter, language: "Rust" });
              }}
            >
              Rust
              {filter.language === "Rust" && (
                <FaCheck className="ml-auto text-accent1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {submissions.map((submission) => {
        if (
          (!filter.status && !filter.language) ||
          (filter.language &&
            filter.status &&
            submission?.language?.description === filter.language &&
            submission?.result?.description === filter.status) ||
          (filter.language &&
            !filter.status &&
            submission?.language?.description === filter.language) ||
          (!filter.language &&
            filter.status &&
            submission?.result?.description === filter.status)
        ) {
          return (
            <div
              key={submission._id}
              className="flex items-center gap-12 px-6 py-6 hover:bg-grey3 hover:cursor-pointer"
              onClick={() => handleSubmissionDisplay(submission._id)}
            >
              <div className="flex-col">
                <p
                  className={`text-xl mb-2 font-bold ${
                    submission?.result?.description === "Accepted"
                      ? "text-green"
                      : "text-red-600"
                  }`}
                >
                  {submission?.result?.description}
                </p>
                <p className="text-sm text-grey1">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(submission?.submittedAt))}
                </p>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <p className="px-4 font-bold rounded-full bg-accent1">
                  {submission?.language?.description}
                </p>
                {submission?.tags?.map((tag) => (
                  <p className="px-4 font-bold rounded-full bg-accent1">{tag}</p>
                ))}
              </div>
              <FaChevronRight className="ml-auto" />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Submissions;
