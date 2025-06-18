import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDb from "./config/connect.js";



const app = express();

const port =process.env.PORT || 3000;

connectDb();

app.use(express.json());

app.use(cookieParser());
app.use(cors({credentials: true})) //sending cookies in response tofrontend

app.get ('/', (req, res)=>res.send("Api is doing some working"))

app.listen(port , ()=> console.log(`Server started on port ${port}`));
