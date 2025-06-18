import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"


const app = express();

const port =process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());
app.use(cors({credentials: true})) //sending cookies in response tofrontend

app.listen(port , ()=> console.log(`Server started on port ${port}`));
