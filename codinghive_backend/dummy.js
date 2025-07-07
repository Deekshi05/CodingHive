import express from "express";
const app=express();

app.get("/",(req,res)=>{
     res.writeHead(200,{'content-type':'plane-text'});
     res.send("welcome to the page");
})

app.listen(3000,()=>{
    console.log("server started");
})