
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';

 import authRouter from "./routes/auth.router.js"
 import flashCardRouter from "./routes/flashcard.router.js"

import cors from "cors";

dotenv.config();
const PORT =  5000;
const app = express();


 mongoose.connect(process.env.MONGO, {

}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`); 
});
app.use("/api",authRouter);
app.use("/api",flashCardRouter);
app.use((err,req,res,next)=>{
     const statusCode=err.statusCode ||500;
     const message=err.message || "Internal Server Error";
     res.json({
      success:false,
      statusCode:statusCode,
      message:message,
     })
});