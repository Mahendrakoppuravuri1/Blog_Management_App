import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "create.html"));
});

app.post("/submit", (req, res) => {
    posts.push(req.body);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const index = req.params.id;
    console.log("Edit page requested for index:", index);
    res.render("edit.ejs", { post: posts[index], index: index });
});

app.post("/edit/:id", (req, res) => {
    const index = req.params.id;
    posts[index] = { title: req.body.title, content: req.body.content };
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const index = req.params.id;
    posts.splice(index, 1);
    res.render("index.ejs", {
        posts: posts,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
