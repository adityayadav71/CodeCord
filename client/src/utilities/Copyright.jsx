const Copyright = (props) => {
  return (
    <div className="flex flex-row items-center w-full px-9 py-9 mt-auto text-grey1 ">
      <p className="mr-9">&#169; {new Date().getFullYear()} CodeCord</p>
      <ul className="flex flex-row gap-x-6">
        <li>
          <a href="#">Help</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#"> Policy</a>
        </li>
      </ul>
    </div>
  );
};

export default Copyright;
