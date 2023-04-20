const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: [
              "http://localhost:3000", 
              "http://localhost"
        ],
    
        methods: ["GET", "POST", "PUT"]
      }
})
app.use(cors({
    origin: 'http://localhost:3000'
}))

let dict = new Map()
app.post('/', (req, res) => {
    console.log('post works!')
})
io.on('connection', (socket) => {
    console.log(socket.id);
    //console.log(socket.handshake)

    // handle incoming messages
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    const { myEmail, email,sms } = data
    console.log(myEmail + " to: " + email);
    dict.set(myEmail, socket.id)

    // sending message
    
    io.to(dict.get(email)).emit('message',"This is single user message")
    // broadcast message to all connected clients except the sender
    //socket.broadcast.emit('message', data);
  });

  // handle disconnection
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });

})


server.listen(3005, () => {
    console.log("socket server listening on port 3005");
})