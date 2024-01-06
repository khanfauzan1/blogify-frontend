import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import { UserContext } from "../context/UserContext";
const URL=import.meta.env.VITE_SERVER_URL
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const user=window.localStorage.getItem('user')
  const userId=window.localStorage.getItem('userId')
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + userId);
      console.log(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + userId,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      setUpdated(false);
      console.log(err);
    }
  };
  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + userId, {
        withCredentials: true,
      });
      window.localStorage.removeItem("user")
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + userId);
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [param]);
  useEffect(() => {
    fetchUserPosts();
  }, [param]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        <div className="flex flex-col md:w-[70%] w-full">
          <h1 className="text-xl font-bold mb-4"> Your posts:</h1>
          {posts?.map((post) => (
          <>
            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
            <ProfilePosts key={post._id} post={post} />
            </Link>
          </>
          ))}
        </div>
        <div className=" md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full mb-8 md:items-end">
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500 "
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-500 "
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 text-gray-500 "
              placeholder="you can update password)"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8 ">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully
              </h3>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
