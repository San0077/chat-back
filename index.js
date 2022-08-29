import { Server } from "socket.io";
import express from "express"
import cors from "cors"
import http from "http"
import dotenv from 'dotenv'

const app = express()
app.use(cors())
const server = http.createServer(app)
dotenv.config()
const io  = new Server(server)
var PORT = process.env.PORT
app.post("/",(req,res)=>{

io.on("connection",(socket)=>{
   socket.on("join_room",(data)=>{
      socket.join(data)
       console.log(socket.id)
      
      
   })
   socket.on("send_msg",(message)=>{
    socket.to(message.room).emit("receive",message);
    
    
 })
 socket.on("disconnect",()=>{
    console.log("user disconste")
 })
})
})

server.listen(PORT,()=>{
    console.log("server is ready")
});
