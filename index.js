const express = require("express");
const app = express();

const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const port = process.env.PORT || 8080;


app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'));
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username : "abrar",
        content : "hello there",
        id : uuidv4()
    },
    {
        username : "vikas",
        content : "some thought",
        id : uuidv4()

    },
    {
        username : "manish",
        content : "heeeeeeeeeeeeeeeeeeeeeeeeeeee",
        id : uuidv4()

    },
    {
        username : "xyz",
        content : "some xyz thought",
        id : uuidv4()

    },

]

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.get("/posts", (req, res)=>{
    res.render("index.ejs",{posts});
})
app.post("/posts", (req, res)=>{
    let {username , content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
})

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs")
})

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newcontent;
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts")
})

app.listen(port, "0.0.0.0", ()=>{
    console.log("listing on port :8080");
})

