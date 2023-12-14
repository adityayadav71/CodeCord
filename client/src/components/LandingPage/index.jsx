import { useState } from "react";
import Hero from "./Hero";
import Feature from "./Feature";
import Footer from "./Footer";
import { InView } from "react-intersection-observer";
import StickyNavbar from "./StickyNavbar";
import ReturnToTop from "./ReturnToTop";

const LandingPage = (props) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  return (
    <>
      <InView
        threshold={[0]}
        onChange={(inView) => {
          setIsAtTop(inView);
        }}
      >
        <Hero />
      </InView>
      <InView
        threshold={[0.5]}
        onChange={(inView) => {
          if (inView) setActiveSection("Collaborate");
        }}
      >
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
      </InView>
      <InView
        threshold={[0.5]}
        onChange={(inView) => {
          if (inView) setActiveSection("Compete");
        }}
      >
        <Feature
          supTitle="Compete"
          TitleHighLight="Attend Weekly Global Contests"
          Title=" and challenge your coding skills"
          color="easyGreen"
          gradient="featureGradient2"
          glow="feature2"
          extra="noText"
          list={[
            "Join weekly coding contests for a fun and challenging way to enhance your skills.",
            "Compete with a global community, putting your coding abilities to the test.",
            "Stay motivated and track your progress by participating in regular, timed coding challenges.",
          ]}
        />
      </InView>
      <InView
        threshold={[0.5]}
        onChange={(inView) => {
          if (inView) setActiveSection("Solve");
        }}
      >
        <Feature
          supTitle="Solve"
          TitleHighLight="Filter problems by topics, difficulty, companies "
          Title=" and solve"
          color="mediumYellow"
          gradient="featureGradient3"
          glow="feature3"
          list={[
            "Focus your coding practice by picking problems in specific topics.",
            "Adjust the difficulty to match your coding skills seamlessly.",
            "Practice for real-world challenges with problems tailored to specific companies.",
          ]}
        />
      </InView>
      <Feature supTitle="Sign up for CodeCord" color="accent1" gradient="featureGradient4" extra="SignUp" glow="feature1" />
      <Footer />
      {!isAtTop && (
        <>
          <StickyNavbar activeSection={activeSection} />
          <ReturnToTop />
        </>
      )}
    </>
  );
};

export default LandingPage;
