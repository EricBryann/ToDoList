import React from "react";
import Post from "./Post";

function PostList(props) {
    return (
        props.posts.map(post => {
            return (
                <Post
                    key = {post._id}
                    id = {post._id}
                    title = {post.title}
                    body = {post.body}
                    onDelete = {props.onDelete}
                />
            )
        })
    )
}

export default PostList