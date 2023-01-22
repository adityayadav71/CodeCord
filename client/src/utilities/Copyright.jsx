import React from "react";

const Copyright = (props) => {
  return (
    <div className="flex flex-row items-center w-screen px-9 py-px text-grey1 ">
      <p className="mr-9">Copyright 2023 CodeCord</p>
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
      <div className="flex flex-row items-center gap-x-2 ml-auto ">
        <div className="w-6 h-6 rounded-full bg-grey2"></div>
        <p>India</p>
      </div>
    </div>
  );
};

export default Copyright;
