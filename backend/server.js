import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Release from "./models/Release.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"));

app.get("/releases", async (req,res)=>{
  res.json(await Release.find().sort({createdAt:-1}));
});

app.post("/releases", async (req,res)=>{
  res.json(await Release.create(req.body));
});

app.patch("/releases/:id/steps", async (req,res)=>{
  res.json(await Release.findByIdAndUpdate(
    req.params.id,
    {steps:req.body.steps},
    {new:true}
  ));
});

app.patch("/releases/:id/info", async (req,res)=>{
  res.json(await Release.findByIdAndUpdate(
    req.params.id,
    {additionalInfo:req.body.additionalInfo},
    {new:true}
  ));
});

app.delete("/releases/:id", async (req,res)=>{
  await Release.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

app.listen(5000,()=>console.log("Server running"));