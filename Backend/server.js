import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/MongoDb.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebHooks.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/clerk', clerkWebhooks)

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/user", userRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Running on port: " + port);
})

