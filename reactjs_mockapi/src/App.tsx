import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

//  define an interface due to typescript strict type checking
interface Post {
  id: string;
  title: string;
  desc: string;
}

function App() {
  // implement useState and useEffect to fetch data from the API
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);
  // adding a new post
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3000/posts");
      setPosts(result.data);
    };
    fetchPosts();
  }, []);
  // function to add a new post
  const addPost = async () => {
    if (!title || !desc) return;

    const maxId = posts.length > 0 ? Math.max(...posts.map(post => Number(post.id))) : 0;
    const newPost = {
      id: (maxId + 1).toString(), // Generate a unique ID by adding 1 to the current max ID
      title,
      desc,
    };

    await axios.post("http://localhost:3000/posts", newPost);
    setPosts([...posts, newPost]);
    setTitle("");
    setDesc("");
  };

  // id needs to have an explicit type defined
  const deletePost = async (id: string) => {
    const newPostList = posts.filter(post => {
    // returns only the cards that weren't crossed on
      return post.id !== id;
    });
    // get rid of the entry that matches the removed post's id
    await axios.delete(`http://localhost:3000/posts/${id}`);
    setPosts(newPostList);
  }

  return (
    <div className="">
      {/* adding a new card */}
      <div className="flex flex-col sm:flex-row items-center justify-center p-4 bg-gray-200
      space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 mx-2 border border-gray-300 rounded-md w-64"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="p-2 mx-2 border border-gray-300 rounded-md w-64"
        />
        <button onClick={addPost} className="p-2 mx-2 bg-blue-500 text-white rounded-md">Add Post</button>
      </div>
      {/* displaying all the cards */}
      <div className="App flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-40 mt-10">
          {/* fetches from fake api and maps through them to display each post as a card */}
          {posts && posts.map(post => (
            <div className="block max-w-sm min-w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
              <div className="flex justify-between items-start">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{post.title}</h5>
                {/* clicking this button should delete the post from webpage and api*/}
                <button className="delete ml-5" onClick={() => deletePost(post.id)}>X</button>
              </div>
              <p className="font-normal text-sm text-gray-700">{post.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
