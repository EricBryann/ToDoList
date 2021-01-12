import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function NewPost(props) {

  const [isExpanded, setIsExpanded] = useState(false);

  //"post" is then passed to other components (App) as a new post
  const [post, setPost] = useState({
    title: "",
    body: ""
  });

  //save changed data in "post"
  function changeHandler(event) {
    const { name, value } = event.target;

    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  //passing "post" to other components (such as PostList)
  function submitPost(event) {
    props.onAdd(post);
    setPost({
      title: "",
      body: ""
    });
    event.preventDefault();
  }

  function expandHandler() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-post">
        {isExpanded && ( 
        <input
          name="title"
          onChange={changeHandler}
          value={post.title}
          placeholder="Title"
        /> )}
        <textarea
          name="body"
          onClick={expandHandler}
          onChange={changeHandler}
          value={post.body}
          placeholder = {isExpanded? "Content" : "New Note"}
          rows= {isExpanded? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitPost}>
            <AddIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default NewPost;
