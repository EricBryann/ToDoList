import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewPost from "./NewPost";
import PostList from "./PostList";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Get saved posts from the database when the page first renders
  useEffect(() => {
    const getPosts = async() => {
      setIsLoading(true);
      const response = await fetch(process.env.REACT_APP_BACKEND_URL)
      console.log(process.env.REACT_APP_BACKEND_URL);
      const responseData = await response.json();
      setPosts(responseData.posts);
      setIsLoading(false);
    }
    getPosts();
  }, [])

  async function addPost(newPost) {
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            title: newPost.title,
            body: newPost.body
          })
        })
        const responseData = await response.json();
        setPosts(prevPosts => {
          return [...prevPosts, responseData.post]
        });
        setIsLoading(false);
  }

  async function deletePost(id) {
    setIsLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      },
        body: null
    });
    
    setPosts(prevPosts => {
      return prevPosts.filter(post => {
        return post._id !== id;
      })
    });
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay/>}
      <Header />
      <NewPost onAdd={addPost} />
      <PostList
        posts = {posts}
        onDelete = {deletePost}
      />
    </React.Fragment>
  );
}

export default App;
