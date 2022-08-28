import { Server } from "socket.io";
import express from "express"
import cors from "cors"
import http from "http"
import dotenv from 'dotenv'
const app = express()
app.use(cors())
const server = http.createServer(app)
dotenv.config()
const PORT=process.env.PORT ;
const io  = new Server(server,{
//     cors:{
//         origin:"https://630bac4f7ca56172a9983f94--charming-sprinkles-819e65.netlify.app/",
//         methods:["GET","POST"],
//     }
})
app.get("/hello",(req,res)=>{
   res.send("hello")
})
io.on("connection",(socket)=>{
   socket.on("join_room",(data)=>{
      socket.join(data)
   
      
      
   })
   socket.on("send_msg",(message)=>{
    socket.to(message.room).emit("receive",message);
    
    
 })
 socket.on("disconnect",()=>{
    console.log("user disconste")
 })
})


server.listen(PORT,()=>{
    console.log("server is ready")
});
