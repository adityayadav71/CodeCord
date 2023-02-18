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

function App() {
  return (
    <div className="mx-auto h-full w-full max-w-[2560px] overflow-x-hidden">
      <>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
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
  );
}

export default App;
