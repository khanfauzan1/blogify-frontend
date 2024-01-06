import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const URL=import.meta.env.VITE_SERVER_URL
import { UserContext } from "../context/UserContext";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, [postId]);
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      fetchPostComments();

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>

            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p>
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => navigate("/edit/" + postId)}
                  />
                </p>
                <p>
                  <MdDelete
                    className="cursor-pointer"
                    onClick={handleDeletePost}
                  />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={post.photo} className="w-full mx-auto mt-8 " alt="" />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* comment */}
            {comments?.map((c) => (
              <Comments key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a commnet */}
          <div className="w-full flex flex-col mt-4 md:flex-row ">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="write a comment"
              className="md:w-[90%] outline-none px-4 mt-4 mb-2 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm  text-white px-4 py-2 md:w-[10%] md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
