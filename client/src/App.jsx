import { Routes, Route } from "react-router-dom";
import NotFound from "./utilities/NotFound";
import LandingPage from "./components/LandingPage/index";
import Contest from "./components/Contests/index";
import Problem from "./components/Problems/index";
import Discussion from "./components/Discussions/index";
import Editor from "./components/Editor/index";
import AppLayout from "./layouts/AppLayout";
import LandingLayout from "./layouts/LandingLayout";
import CreateRoom from "./components/Rooms/CreateRoom";
import PasswordReset from "./components/Authentication/PasswordReset";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import { createContext, React, useState, useEffect } from "react";

export const AuthContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/v1/users/isLoggedIn", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      });
      const result = await response.json();
      setIsLoggedIn(result.isLoggedIn);
    }
    fetchData();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="mx-auto h-full w-full max-w-[2560px] overflow-x-hidden">
        <>
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Contest />} />
              </Route>
            ) : (
              <Route path="/" element={<LandingLayout />}>
                <Route index element={<LandingPage />} />
              </Route>
            )}
            <Route path="/create">
              <Route index element={<CreateRoom />} />
            </Route>
            <Route path="/app" element={<AppLayout />}>
              <Route path="contest" element={<Contest />} />
              <Route path="problem">
                <Route index element={<Problem />} />
                <Route path=":name" element={<Editor />} />
              </Route>
              <Route path="discussion" element={<Discussion />} />
              <Route path="auth">
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="reset/request" element={<ForgotPassword />} />
                <Route path="reset/:token" element={<PasswordReset />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
