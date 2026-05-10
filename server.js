import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.post("/create", (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const blog = req.body.blog;
    const id = Date.now();
    const newPost = {
        name: username,
        title: title,
        message: blog,
        id : id,
    };
    posts.push(newPost);
    res.redirect("/");
    console.log(`${username}, ${title}, ${blog}, ${id}`);
});

app.get("/edit/:id", (req, res) => {
    const userid = req.params.id;
    const post = posts.find((post) => post.id == userid);
    res.render("edit.ejs", { post: post });
});

app.post("/update/:id", (req, res) => {

    const userid = req.params.id;

    const post = posts.find((post) => post.id == userid);

    post.name = req.body.username;
    post.title = req.body.title;
    post.message = req.body.blog;

    res.redirect("/");

});

app.post("/delete/:id", (req, res) => {

    const userid = req.params.id;

    posts = posts.filter((post) => post.id != userid);

    res.redirect("/");

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});