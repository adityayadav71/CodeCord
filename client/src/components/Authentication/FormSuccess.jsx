import { FaCheckCircle } from "react-icons/fa";

const FormSuccess = ({ message }) => {
  return (
    <div className="flex flex-row items-center gap-x-3 w-full gap-y-2 bg-greenBackGround p-3 rounded-lg">
      <FaCheckCircle className="text-3xl text-easyGreen" />
      <p className="text-md leading-6 text-easyGreen">{message}</p>
    </div>
  );
};

export default FormSuccess;
