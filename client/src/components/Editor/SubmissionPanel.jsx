import { useContext } from "react";
import { AuthContext } from "../../App";
import { FaTimes, FaUserAlt } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import * as themes from "@uiw/codemirror-themes-all";

const SubmissionPanel = ({
  isRoom,
  submissionDetails,
  setSubmissionDetails,
  setDisplaySubmission,
}) => {
  const { userData } = useContext(AuthContext);
  return (
    <div className="p-6 h-full bg-transparentSecondary overflow-y-scroll transition duration-300">
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
            className={`font-bold text-xl ${
              submissionDetails?.result?.description === "Accepted"
                ? "text-green"
                : "text-red-600"
            }`}
          >
            {submissionDetails?.result?.description}
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
          {submissionDetails?.tags?.map((tag) => (
            <p className="px-4 font-bold rounded-full bg-accent1">{tag}</p>
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
            placeholder="Write your notes here..."
            className="w-full h-fit p-3 focus:outline-none focus:ring-1 focus:ring-accent1 bg-secondary rounded-lg resize-none"
          ></textarea>
        </div>
        <div>
          <h3 className="mb-3">Related Tags</h3>
          <input
            placeholder="Select tags"
            className="w-full h-fit p-3 focus:outline-none focus:ring-1 focus:ring-accent1 bg-secondary rounded-lg resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionPanel;
