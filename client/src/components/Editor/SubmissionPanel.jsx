import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { FaTimes, FaRegTimesCircle, FaUserAlt } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import * as themes from "@uiw/codemirror-themes-all";
import { updateSubmissionDetails } from "../../api/submissionDataAPI";
import { getAllProblemTags } from "../../api/problemDataAPI";

const SubmissionPanel = ({
  isRoom,
  submissionDetails,
  setSubmissionDetails,
  setDisplaySubmission,
}) => {
  const { userData } = useContext(AuthContext);
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
  const [problemTags, setProblemTags] = useState();
  const [filteredTags, setFilteredTags] = useState();

  const handleNewTag = async (e) => {
    const input = e.target.value;
    if (
      e.key === "Enter" &&
      submissionDetails?.relatedTags?.length < 5 &&
      filteredTags[0]?.name?.toLowerCase().startsWith(input.toLowerCase())
    ) {
      e.target.value = "";
      setFilteredTags(problemTags);
      setSubmissionDetails((prevDetails) => {
        return {
          ...prevDetails,
          relatedTags: [...prevDetails.relatedTags, filteredTags[0]],
        };
      });
      setTagsDropdownOpen(false);
    } else {
      setTagsDropdownOpen(true);
    }
    setFilteredTags(() =>
      !input
        ? problemTags.filter(
            (tag) =>
              !submissionDetails?.relatedTags?.some(
                (relatedTag) => relatedTag._id === tag._id
              )
          )
        : problemTags.filter(
            (tag) =>
              tag.name.toLowerCase().includes(input.toLowerCase()) &&
              !submissionDetails?.relatedTags?.some(
                (relatedTag) => relatedTag._id === tag._id
              )
          )
    );
  };

  const addRelatedTag = async (e) => {
    const input = JSON.parse(e.currentTarget.dataset.id);

    setSubmissionDetails((prevDetails) => {
      return {
        ...prevDetails,
        relatedTags: [...prevDetails.relatedTags, input],
      };
    });
  };

  const handleDeleteTag = async (e) => {
    const input = e.currentTarget.dataset.id;
    setSubmissionDetails((prevDetails) => {
      return {
        ...prevDetails,
        relatedTags: prevDetails.relatedTags.filter((tag) => tag._id !== input),
      };
    });
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  async function updateNote(e) {
    setSubmissionDetails((prevDetails) => {
      return {
        ...prevDetails,
        notes: e.target.value,
      };
    });
    await updateSubmissionDetails({
      ...submissionDetails,
      notes: e.target.value,
    });
  }

  async function updateTags() {
    await updateSubmissionDetails(submissionDetails);
  }

  const handleNoteChange = debounce((e) => updateNote(e));

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".tags-dropdown")) {
        setTagsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    const loadTags = async () => {
      const tags = await getAllProblemTags();
      setProblemTags(tags);
      setFilteredTags(
        tags.filter(
          (tag) =>
            !submissionDetails?.relatedTags?.some(
              (relatedTag) => relatedTag._id === tag._id
            )
        )
      );
    };
    loadTags();
  }, []);

  useEffect(() => {
    setFilteredTags(
      problemTags?.filter(
        (tag) =>
          !submissionDetails?.relatedTags?.some(
            (relatedTag) => relatedTag._id === tag._id
          )
      )
    );
    updateTags();
  }, [submissionDetails]);

  return (
    <div className="p-3 h-full bg-transparentSecondary overflow-y-scroll transition duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 overflow-clip flex flex-row items-center justify-center rounded-full bg-grey2">
            {userData?.profile?.avatar ? (
              <img
                src={`data:${userData?.profile?.avatar?.contentType};base64,${userData?.profile?.avatar?.image}`}
                className="w-full h-full object-cover hover:cursor-pointer"
                alt="profile-pic"
              />
            ) : (
              <FaUserAlt className="text-2xl hover:cursor-pointer" />
            )}
          </div>
          <div>
            <p className="text-xl">{submissionDetails?.userId?.username}</p>
            <p className="text-grey1 text-sm">
              {submissionDetails?.submittedAt &&
                new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(submissionDetails?.submittedAt))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h1
            className={`font-bold text-xl text-right ${
              submissionDetails?.result?.description === "Accepted"
                ? "text-green"
                : "text-red-600"
            }`}
          >
            {submissionDetails?.result?.description}
            <p className="text-grey1 text-right text-sm font-light">
              Runtime{" "}
              <span className="text-base text-white font-semibold">
                {submissionDetails?.time} ms
              </span>
            </p>
          </h1>
          <FaTimes
            onClick={() => setDisplaySubmission(false)}
            className="text-white text-xl hover:cursor-pointer hover:text-accent1 transition duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="bg-accent1 font-bold rounded-full px-4">
            {submissionDetails?.language?.description}
          </p>
          {submissionDetails?.relatedTags?.map((tag) => (
            <p
              key={tag.slug}
              className="px-4 font-bold rounded-full bg-accent1"
            >
              {tag.name}
            </p>
          ))}
        </div>
        <CodeMirror
          className="rounded-lg overflow-scroll hideScrollbar"
          autoHeight={true}
          options={{
            lineWrapping: true,
          }}
          readOnly={true}
          value={submissionDetails?.code}
          theme={themes.dracula}
          extensions={[java()]}
        />
        <div>
          <h3 className="mb-3">Notes</h3>
          <textarea
            defaultValue={submissionDetails?.notes}
            maxLength="512"
            onKeyUp={handleNoteChange}
            placeholder="Write your notes here..."
            className="w-full h-fit p-3 focus:outline-none focus:ring-1 focus:ring-accent1 bg-secondary rounded-lg resize-none"
          ></textarea>
        </div>
        <div>
          <h3 className="mb-3">Related Tags</h3>
          <div
            className={`relative flex items-center flex-wrap gap-3 hover:cursor-text ${
              tagsDropdownOpen ? "mb-48" : "mb-3"
            } p-3 focus:ring-1 focus:ring-accent1 bg-secondary rounded-lg`}
            onClick={() => setTagsDropdownOpen((prevState) => !prevState)}
          >
            {submissionDetails?.relatedTags?.map((tag) => (
              <div
                key={tag.slug}
                className="flex flex-row items-center flex-wrap gap-3 px-3 w-max bg-primary rounded-full"
              >
                {tag.name}
                <button
                  className="hover:text-accent1 hover:cursor-pointer"
                  data-id={tag._id}
                  onClick={handleDeleteTag}
                >
                  <FaRegTimesCircle />
                </button>
              </div>
            ))}
            {submissionDetails?.relatedTags?.length < 5 && (
              <input
                placeholder="Select tags"
                onKeyUp={handleNewTag}
                className="tags-dropdown grow h-fit focus:outline-none bg-secondary"
              />
            )}
            <div
              className={`tags-dropdown absolute ${
                tagsDropdownOpen ? "" : "hidden"
              } p-3 mt-2 top-full left-0 w-full rounded-lg max-h-44 bg-secondary overflow-y-scroll`}
            >
              {filteredTags?.length !== 0 ? (
                filteredTags?.map((tag) => (
                  <div
                    key={tag.slug}
                    data-id={JSON.stringify(tag)}
                    onClick={addRelatedTag}
                    className="px-3 py-2 rounded-lg first:bg-lightSecondary hover:cursor-pointer hover:bg-lightSecondary"
                  >
                    {tag.name}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 rounded-lg text-grey1">
                  No tags Found
                </div>
              )}
            </div>
            <p className="ml-auto text-grey1">
              {submissionDetails?.relatedTags?.length}/5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPanel;
