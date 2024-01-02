import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import ActiveRooms from "./components/Rooms/ActiveRooms";
import ProblemTagList from "./components/Problems/ProblemTagList";
import LoadingScreen from "./components/LandingPage/LoadingScreen";
import { createContext, useState, useEffect } from "react";
import { logout, checkLogInStatus } from "./api/authDataAPI";
import Profile from "./components/HomePage/Profile";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { SOCKET_URL } from "./api/apiConfig";

export const AuthContext = createContext(null);
export let loadData;

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [userData, setUserData] = useState({});
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  loadData = async () => {
    const MIN_DISPLAY_TIME = 500;
    const startTime = new Date().getTime();

    const status = await checkLogInStatus();
    if (status.isLoggedIn && socket === null) {
      const socket = io(SOCKET_URL, {
        path: "/api/v1/socket.io",
      });
      setSocket(socket);
    }
    // Calculate loading time
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    const remainingTime = elapsedTime > MIN_DISPLAY_TIME ? 0 : MIN_DISPLAY_TIME;

    // Delay hiding loading screen for faster connections
    setTimeout(() => {
      setIsLoggedIn(status.isLoggedIn);
      setUserData(status.userData);
    }, remainingTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadData();
      setIsLoading(false);
      socket?.on("room-ended", () => {
        loadData();
      });
    };
    fetchData();
  }, [socket]);

  const handleLogout = async () => {
    try {
      const loggedOut = await logout();
      setIsLoggedIn(!loggedOut);
      navigate("/", { replace: true });
      toast.success("Logged out successfully!", {
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        socket,
        setSocket,
        isLoading,
        setIsLoading,
      }}
    >
      <div className='relative w-full h-full'>
        {<LoadingScreen isLoggedIn={isLoggedIn} />}
        {isLoggedIn !== undefined && (
          <div className='mx-auto h-full w-full max-w-[1920px] overflow-x-hidden'>
            <>
              <Routes>
                {isLoggedIn ? (
                  <Route
                    path='/'
                    element={<AppLayout handleLogout={handleLogout} />}
                  >
                    <Route index element={<Contest />} />
                  </Route>
                ) : (
                  <Route path='/' element={<LandingLayout />}>
                    <Route index element={<LandingPage />} />
                  </Route>
                )}
                <Route path='/create'>
                  <Route index element={<CreateRoom />} />
                </Route>
                <Route
                  path='/app'
                  element={
                    <AppLayout
                      handleLogout={handleLogout}
                      location={location}
                    />
                  }
                >
                  <Route path='contest' element={<Contest />} />
                  <Route path='problem'>
                    <Route index element={<Problem />} />
                    <Route path=':name' element={<Editor isRoom={false} />} />
                  </Route>
                  <Route path='room'>
                    <Route index element={<Problem />} />
                    <Route path=':name' element={<Editor isRoom={true} />} />
                  </Route>
                  <Route path='rooms' element={<ActiveRooms />} />
                  <Route path='discussion' element={<Discussion />} />
                  <Route path='tag/:tagname' element={<ProblemTagList />} />
                  <Route path='user/:username' element={<Profile />} />
                  <Route path='auth'>
                    <Route path='signup' element={<SignUp />} />
                    <Route path='login' element={<Login />} />
                    <Route path='reset/request' element={<ForgotPassword />} />
                    <Route path='reset/:token' element={<PasswordReset />} />
                  </Route>
                </Route>
                <Route path='/notfound' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </>
          </div>
        )}
      </div>
      <Toaster />
    </AuthContext.Provider>
  );
}

export default App;
