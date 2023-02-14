import Hero from "./Hero";
import Feature from "./Feature";
import Footer from "./Footer";
// import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <>
      <Hero />
      <Feature
        supTitle="Collaborate"
        TitleHighLight="Create rooms"
        Title=" and invite your friends to compete"
        color="accent1"
        gradient="featureGradient1"
        glow="feature1"
        list={[
          "Set a timer and solve a set amount of problems.",
          "Use score board to compare performance.",
          "Go through everyone’s code after the contest ends.",
          "Discuss with others in the room on call.",
        ]}
      />
      <Feature
        supTitle="Compete"
        TitleHighLight="Attend Weekly Global Contests"
        Title=" and improve your contest rating"
        color="easyGreen"
        gradient="featureGradient2"
        glow="feature2"
        extra="noText"
      />
      <Feature
        supTitle="Solve"
        TitleHighLight="Filter problems by topics, difficulty "
        Title=" and solve them"
        color="mediumYellow"
        gradient="featureGradient3"
        glow="feature3"
        list={[
          "Solve problems independently.",
          "Solve problems asked in big tech company interviews.",
          "Use tags to include specific type of problems in contest rooms.",
        ]}
      />
      <Feature
        supTitle="Sign up for an account"
        color="accent1"
        gradient="featureGradient4"
        extra="SignUp"
        glow="feature1"
      />
      <Footer />
      {/* {!isAtTop && (
        <nav className="transition duration-300 fixed top-0 left-0 flex flex-row gap-x-3 items-center justify-between bg-primary w-full">
          <ul className="flex flex-row items-center">
            <li className="p-6">Collaborate</li>
            <li className="p-6">Compete</li>
            <li className="p-6">Solve</li>
          </ul>
          <div className="flex flex-row items-center gap-x-6 ml-auto">
            <Link
              to="/app/auth/login"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 border border-white text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
            >
              Login
            </Link>
            <Link
              to="/app/auth/signup"
              className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 bg-accent1 text-white text-center font-bold rounded-xl hover:shadow-signUp hover:shadow"
            >
              Sign up
            </Link>
          </div>
        </nav>
      )} */}
    </>
  );
};

export default LandingPage;
