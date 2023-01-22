import React from "react";
import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Feature from "./components/LandingPage/Feature";
import Footer from "./components/LandingPage/Footer";
import Copyright from "./utilities/Copyright";

function App() {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Feature
        supTitle="Collaborate"
        TitleHighLight="Create rooms"
        Title=" and invite your friends to compete"
        accent1="accent1"
        accent2="easyGreen"
        list={[
          "Set a timer and solve a set amount of problems.",
          "Use score board to compare performance.",
          "Go through everyone’s code after the contest ends.",
          "Discuss with others in the room on call.",
        ]}
      />
      <Feature supTitle="Compete" TitleHighLight="Attend Weekly Global Contests" Title=" and improve your contest rating" accent1="easyGreen" accent2="mediumYellow" />
      <Feature
        supTitle="Solve"
        TitleHighLight="Filter problems by topics, difficulty "
        Title=" and solve them"
        accent1="mediumYellow"
        accent2="accent1"
        list={["Solve problems independently.", "Solve problems asked in big tech company interviews.", "Use tags to include specific type of problems in contest rooms."]}
      />
      <Feature supTitle="Sign up for an account" extra="SignUp"/>
      <Footer />
      <Copyright />
    </div>
  );
}

export default App;
