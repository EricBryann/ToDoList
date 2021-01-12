import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Post(props) {
  function clickHandler() {
    props.onDelete(props.id);
  }

  return (
    <div className="post">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
      <button onClick={clickHandler}>
        <DeleteIcon/>
      </button>
    </div>
  );
}

export default Post;
