import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.resolve("./public")))

// now on every new user (socket) connection we will do something
io.on("connection", (socket) => {
  //   console.log("A new user has connected", socket.id)
  socket.on("message", (message) => {
    // console.log("A new message from client", message)
    io.emit("message", message)
  })
})

app.get("/", (req, res) => {
  //   res.render("index.html")
  return res.sendFile("/public/index.html")
})

server.listen(5000, () => console.log("Server running at port 5000"))
