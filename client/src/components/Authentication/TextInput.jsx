const TextInput = ({placeholder}) => {
  return (
    <input className="w-full rounded-xl h-18 px-6 py-6 text-base focus:outline focus:outline-accent1 bg-grey3" placeholder={`${placeholder}`}></input>
  )
};

export default TextInput;
