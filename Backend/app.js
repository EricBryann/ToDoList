const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const postSchema = {
    title: String,
    body: String
}

const Post = mongoose.model("Post", postSchema);

//Allowing the frontend to access the backend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
})

app.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.send({posts});
})

app.post("/", async (req, res) => {
    const {title, body} = req.body;
    const newPost = new Post({
        title,
        body
    })
    newPost.save(function(err) {
        console.log(err);
    });
    res.send({post: newPost});

})

app.delete("/:pid", async (req, res) => {
    const postId = req.params.pid;
    
    const post = await Post.findById(postId);
    await post.remove();
    res.send({message: "Deleted item"});
})


mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.94ex4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })