const Hero = (props) => {
  return (
    <div className="relative px-9 mt-11 mb-11 h-screen max-h-[720px]">
      <h1 className="text-6xl w-4/6 leading-[5rem] font-bold">Communicate, Practice, and Improve Your Coding Skills</h1>
      <p className="text-2xl text-grey2 w-1/2 leading-[2rem]  mt-5">
        Our platform enables software developers to practice, collaborate, and improve their coding skills through a range of tools, resources, and incentives.
      </p>
      <div className="absolute z-[-1] bg-graphicLightBlue w-[1801.5px] h-[1273.94px] -top-[64.677%] left-[69.677%] origin-center -rotate-[42deg]"></div>
      <div className="absolute z-[-1] bg-graphicDarkBlue w-[472.59px] h-[545.4px] top-[23%] left-[90%] origin-center -rotate-[42deg]"></div>
      <div className="text-5xl text-right leading-[4rem] font-bold">
        <h1>CONNECT</h1>
        <h1>COLLABORATE</h1>
        <h1>CODE</h1>
      </div>
    </div>
  );
};

export default Hero;
