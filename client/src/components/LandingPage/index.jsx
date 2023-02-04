import React from "react";
import Hero from "./Hero";
import Feature from "./Feature";
import Footer from "./Footer";

const LandingPage = (props) => {
  return (
    <>
      <Hero />
      <Feature
        supTitle="Collaborate"
        TitleHighLight="Create rooms"
        Title=" and invite your friends to compete"
        color="accent1"
        gradient1="topBlueGradient"
        gradient2="bottomGreenGradient"
        feature="feature1"
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
        gradient1="topGreenGradient"
        gradient2="bottomYellowGradient"
        feature="feature2"
        extra="noText"
      />
      <Feature
        supTitle="Solve"
        TitleHighLight="Filter problems by topics, difficulty "
        Title=" and solve them"
        color="mediumYellow"
        gradient1="topYellowGradient"
        gradient2="bottomBlueGradient"
        feature="feature3"
        list={["Solve problems independently.", "Solve problems asked in big tech company interviews.", "Use tags to include specific type of problems in contest rooms."]}
      />
      <Feature supTitle="Sign up for an account" color="accent1" gradient1="topBlueGradient" extra="SignUp" feature="feature1" />
      <Footer />
    </>
  );
};

export default LandingPage;
