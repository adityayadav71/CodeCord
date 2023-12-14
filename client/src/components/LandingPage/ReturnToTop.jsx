import { FaCaretUp } from "react-icons/fa";

const ReturnToTop = (props) => {
  return (
    <button
      className="fixed bottom-10 right-10 w-12 h-12 flex flex-row items-center justify-center hover:bg-accent1 bg-accent3 rounded-full"
      onClick={() =>
        document.getElementById("top").scrollIntoView({ behavior: "smooth" })
      }
    >
      <FaCaretUp className="text-white text-3xl" />
    </button>
  );
};

export default ReturnToTop;
