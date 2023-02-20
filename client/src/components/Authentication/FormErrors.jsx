import { MdCancel } from "react-icons/md";

const FormErrors = ({ message }) => {
  return (
    <div className="flex flex-row items-center gap-x-3 w-full gap-y-2 bg-lightPrimary border border-hardRed p-3 rounded-lg">
      <MdCancel className="text-3xl text-hardRed" />
      <p className="text-md leading-6 text-red-600 font-bold">{message}</p>
    </div>
  );
};

export default FormErrors;
