import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";

const AppLayout = ({ handleLogout }) => {
  const params = useParams();

  return (
    <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
      <Navbar handleLogout={handleLogout} />
      <Outlet />
      {!params?.name && <Copyright />}
    </div>
  );
};

export default AppLayout;
