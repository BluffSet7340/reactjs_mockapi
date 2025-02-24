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
  // editing a post
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/posts");
        setPosts(result.data);
      } catch (error) {
        console.error("Error fetching posts:", error); // basic error handling
      }
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
    // try catch block for error handling
    try {
      await axios.post("http://localhost:3000/posts", newPost);
      setPosts([...posts, newPost]);
      setTitle("");
      setDesc("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // id needs to have an explicit type defined
  const deletePost = async (id: string) => {
    const newPostList = posts.filter(post => {
    // returns only the cards that weren't crossed on
      return post.id !== id;
    });
    // get rid of the entry that matches the removed post's id
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts(newPostList);
    } catch (error) {
      console.error("Error deleting post:", error);
    }

  }

  // editing a post
  const editPost = async (id: string) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setDesc(postToEdit.desc);
      setIsEditing(true);
      setCurrentPostId(id);
    }
  };
  // updating a post
  const updatePost = async () => {
    if (!title || !desc || !currentPostId) return;

    const updatedPost = {
      id: currentPostId,
      title,
      desc,
    };

    try {
      await axios.put(`http://localhost:3000/posts/${currentPostId}`, updatedPost);
      setPosts(posts.map(post => (post.id === currentPostId ? updatedPost : post)));
      setTitle("");
      setDesc("");
      setIsEditing(false);
      setCurrentPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };


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
        <button onClick={isEditing ? updatePost : addPost} className="p-2 mx-2 bg-blue-500 text-white rounded-md">
          {isEditing ? "Update Post" : "Add Post"}
        </button>
        {/* <button onClick={addPost} className="p-2 mx-2 bg-blue-500 text-white rounded-md">Add Post</button> */}
      </div>
      {/* displaying all the cards */}
      <div className="App flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-40 mt-10">
          {/* fetches from fake api and maps through them to display each post as a card */}
          {posts && posts.map(post => (
            <div className="block max-w-sm min-w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
              <div className="flex justify-between items-start">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{post.title}</h5>
                <div className="flex space-x-3">
                  {/* this button should allow for editing the post and updating it */}
                  <button className="ml-5" onClick={() => editPost(post.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  {/* clicking this button should delete the post from webpage and api*/}
                  <button className="ml-5" onClick={() => deletePost(post.id)}>X</button>
                </div>
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
