import { React } from "react";
import Copyright from "./utilities/Copyright";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/HomePage/Navbar";
import Form from "./components/Authentication/Form";

function App() {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-x-hidden">
      <LandingPage />
      {/* <Navbar />
      <div className="flex flex-row items-center grow w-full py-9 px-9">
        <Form type="Sign Up" fields={["Username", "Password", "Confirm New Password", "Email Address"]} buttonName="Sign Up" />
        <Form type="Sign In" fields={["Username or Email", "Password"]} buttonName="Sign In" />
        <Form type="Password Reset Request" fields={["Registered Email Address"]} buttonName="Reset My Password" />
        <Form type="Password Reset" fields={["New Password", "Confirm New Password"]} buttonName="Reset My Password" />
      </div>
      <Copyright /> */}
    </div>
  );
}

export default App;
