import { Server } from "socket.io";
import express from "express"
import cors from "cors"
import http from "http"
import dotenv from 'dotenv'
import { createServer } from "http";

const app = express()
app.use(cors())
const server = createServer(app)
dotenv.config()
const io  = new Server(server,{
    cors: {
        origin: ["http://localhost:3000","https://charming-sprinkles-819e65.netlify.app"],
        methods: ["GET", "POST"],
      },
})
var port = process.env.PORT


io.of("/").on("connection",(socket)=>{
   socket.on("join_room",(data)=>{
      socket.join(data)
       console.log(data)
      
      
   })
   socket.on("send_msg",(message)=>{
    socket.to(message.room).emit("receive",message);
    
    
 })
 socket.on("disconnect",()=>{
    console.log("user disconste")
 })
})


server.listen(port,()=>{
    console.log("server is ready"+port)
});
