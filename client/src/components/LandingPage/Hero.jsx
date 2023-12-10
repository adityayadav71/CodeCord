const Hero = (props) => {
  return (
    <div className="relative px-9 mt-11 mb-11 h-screen max-h-[720px]">
      <h1 className="lg:text-6xl text-4xl lg:w-4/6 md:w-5/6 lg:leading-[5rem] leading-[3rem] font-bold">Communicate, Practice, and Improve Your Coding Skills</h1>
      <p className="lg:text-2xl lg:w-1/2 md:w-1/2 text-xl text-grey2 leading-[2rem] mt-5">
        Our platform enables software developers to practice, collaborate, and improve their coding skills through a range of tools, resources, and incentives.
      </p>
      <div className="absolute z-[-1] bg-graphicLightBlue w-[1801.5px] h-[1273.94px] lg:-top-[385px] sm:-top-[450px] -top-[350px] lg:left-[70%] left-[75%] origin-center -rotate-[42deg]"></div>
      <div className="absolute z-[-1] bg-graphicDarkBlue w-[472.59px] h-[545.4px] top-[200px] sm:top-[75px] lg:left-[90%] left-[90%] origin-center -rotate-[42deg]"></div>
      <div className="lg:pt-8 md:pt-28 sm:pt-28 pt-44 lg:text-5xl text-4xl lg:leading-[4rem] leading-[3rem] text-right font-bold">
        <h1>CONNECT</h1>
        <h1>COLLABORATE</h1>
        <h1>CODE</h1>
      </div>
    </div>
  );
};

export default Hero;
