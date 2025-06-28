import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDb from "./config/connect.js";
import authRouter from './routes/authenticationRoute.js'
import userRoutes from "./routes/userRoute.js";
import dns from 'dns';
const app = express();

const port =process.env.PORT || 3000;
dns.setDefaultResultOrder('ipv4first');
connectDb();

app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true})) //sending cookies in response tofrontend

app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);

app.use()
app.listen(port , ()=> console.log(`Server started on port ${port}`));
