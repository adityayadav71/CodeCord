import { createContext, React, useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/HomePage/Navbar";
import Copyright from "../utilities/Copyright";

export const UserContext = createContext();

const AppLayout = (props) => {
  const params = useParams();
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
  }, []);

  return (
    <UserContext.Provider value={true}>
      <div className={`flex flex-col ${params?.name ? "h-screen" : "h-full"}`}>
        <Navbar />
        <Outlet />
        {!params?.name && <Copyright />}
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
