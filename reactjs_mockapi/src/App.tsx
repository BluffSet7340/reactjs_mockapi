import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

//  define an interface due to typescript strict type checking
interface Post {
  id: number;
  title: string;
  desc: string;
}

function App() {
  // implement useState and useEffect to fetch data from the API
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3000/posts");
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row items-center justify-center p-4 bg-gray-200 hover:bg-gray-400">
        <i className="fas fa-plus text-3xl text-gray-700"></i>
      </div>
      <div className="App flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-40 mt-10">
          {/* fetches from fake api and maps through them to display each post as a card */}
          {posts && posts.map(post => (
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
              <p className="font-normal text-gray-700">{post.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
