import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const URL=import.meta.env.VITE_SERVER_URL
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
   const user=window.localStorage.getItem('user')
  const userId=window.localStorage.getItem('userId')
  const username=window.localStorage.getItem('username')
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPhoto(res.data.photo);
      setDesc(res.data.desc);
      setTitle(res.data.title);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      photo,
      username: username,
      categories: cats,
      userId: userId,
    };
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("img", filename);
    //   data.append("file", file);
    //   post.photo = filename;
    //   //img upload
    //   try {
    //     const imgUpload = await axios.post(URL + "/api/upload", data);
    //     // console.log(imgUpload.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    //post upload

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [postId]);
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Update a post </h1>
        <form className="w-full flex flex-col px-2  mt-4">
        <label className="font-semibold text-md ">Title: </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title "
            className="px-4 py-2 outline-none"
            value={title}
          />
          <label className="font-semibold text-md ">Image URL: </label>
          <input
            onChange={(e) => setPhoto(e.target.value)}
            type="text"
            value={photo}
            className="px-4 py-2 outline-none "
            placeholder="Enter image url"
          />
          <label className="font-semibold text-md pb-2 ">Categories: </label>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none "
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>
            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c} </p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <label className="font-semibold text-md pt-6">Description: </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            col={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
