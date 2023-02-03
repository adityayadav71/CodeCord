import { React } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./utilities/NotFound";
import Copyright from "./utilities/Copyright";
import LandingPage from "./components/LandingPage/index";
import Contest from "./components/Contests/index";
import Problem from "./components/Problems/index";
import Navbar from "./components/HomePage/Navbar";
import Form from "./components/Authentication/Form";

function App() {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-x-hidden">
      <>
        <Navbar />
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <div className="flex flex-row items-center grow w-full py-9 px-9">
                  <Form type="Sign Up" fields={["Username", "Password", "Confirm New Password", "Email Address"]} buttonName="Sign Up" />
                </div>
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <div className="flex flex-row items-center grow w-full py-9 px-9">
                  <Form type="Sign In" fields={["Username or Email", "Password"]} buttonName="Sign In" />
                </div>
              </>
            }
          />
          <Route
            path="/reset/request"
            element={
              <>
                <div className="flex flex-row items-center grow w-full py-9 px-9">
                  <Form type="Password Reset Request" fields={["Registered Email Address"]} buttonName="Reset My Password" />
                </div>
              </>
            }
          />
          <Route
            path="/reset"
            element={
              <>
                <div className="flex flex-row items-center grow w-full py-9 px-9">
                  <Form type="Password Reset" fields={["New Password", "Confirm New Password"]} buttonName="Reset My Password" />
                </div>
              </>
            }
          />
          <Route path="/contest" element={<Contest />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Copyright />
      </>
    </div>
  );
}

export default App;
