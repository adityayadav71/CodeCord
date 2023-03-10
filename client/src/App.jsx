import { Routes, Route, useNavigate } from "react-router-dom";
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
import { createContext, useState, useEffect } from "react";
import { logout, checkLogInStatus } from "./api/authDataAPI";
import Profile from "./components/HomePage/Profile";
import { getUserData } from "./api/profileDataAPI";

export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const setLoggedIn = async () => {
      const status = await checkLogInStatus();
      const response = await getUserData(localStorage.getItem("username"));
      setIsLoggedIn(status);
      setUserData(response.userData);
    };
    setLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const loggedOut = await logout();
      setIsLoggedIn(!loggedOut);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
      <div className="mx-auto h-full w-full max-w-[2560px] overflow-x-hidden">
        <>
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<AppLayout handleLogout={handleLogout}/>}>
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
            <Route path="/app" element={<AppLayout handleLogout={handleLogout}/>}>
              <Route path="contest" element={<Contest />} />
              <Route path="problem">
                <Route index element={<Problem />} />
                <Route path=":name" element={<Editor />} />
              </Route>
              <Route path="discussion" element={<Discussion />} />
              <Route path="user/:username" element={<Profile />} />
              <Route path="auth">
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="reset/request" element={<ForgotPassword />} />
                <Route path="reset/:token" element={<PasswordReset />} />
              </Route>
            </Route>
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
