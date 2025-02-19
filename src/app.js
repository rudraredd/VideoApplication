import express from 'express';
import {createServer} from 'node:http';  
import {Server} from "socket.io";
import mongoose from 'mongoose';
import "dotenv/config"
import cors from 'cors';
import {connectToSocket} from './controllers/socketManager.js';
import userRoutes from "./routes/users.routes.js"
const app = express();
const server= createServer(app);
const io= connectToSocket(server);
app.set("port",( process.env.PORT || 3000));
app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({ limit:'40kb',extended: true}));
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/login",userRoutes);
const dbUrl = process.env.MONGO_DB_URL

const start= async()=>{
    const connectionDb=await mongoose.connect(dbUrl)
    console.log('Mongo db connected: ${connectionDb.connection.host}');
    server.listen(app.get("port"),()=>{
        console.log('Server is running on port 3000');
    });
}
start();