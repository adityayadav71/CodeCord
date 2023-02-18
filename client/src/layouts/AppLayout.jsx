import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";

const AppLayout = (props) => {
  const params = useParams();

  return (
    <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
      <Navbar />
      <Outlet />
      {!params?.name && <Copyright />}
    </div>
  );
};

export default AppLayout;
