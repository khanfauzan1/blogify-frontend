import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
const URL=import.meta.env.VITE_SERVER_URL
import { Link, useNavigate } from "react-router-dom";
const Menu = () => {
    const user=window.localStorage.getItem('user')
  const userId=window.localStorage.getItem('userId')
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res);
       
      navigate("/login");
       window.localStorage.removeItem('user')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="z-10 bg-black w-[150px] flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login"> Login</Link>{" "}
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + userId}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + userId}>My Blogs</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
