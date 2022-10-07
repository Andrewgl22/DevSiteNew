require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
// const {Chat, Convo} = require('./model/model');
const ChatController = require('./controllers/chat.controllers');

//photo upload to server with multer and to AWS S3 with aws-sdk
// const multer = require('multer');
// const upload = multer({dest: 'uploads/'})

require('./config/mongoose.config')

app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

// 2 different ways to use the routes files
const Routes = require('./routes/user.routes');
Routes(app);
require('./routes/chat.routes')(app);
require('./routes/photo.routes')(app);

// app.listen(8000, () => console.log("Listening on port 8000!"));
const server = app.listen(8000, ()=>{
    console.log("Server is up and running on port 8000!")
});


// SOCKET.IO SERVER EVENTS

// const io = require('socket.io')(server, {cors:true});
// const io = require('socket.io')(8000, {
//     cors: {
//         origin: ['http://localhost:3000']
//     },
// })
// Using the Express app server, attach the Socket.io server
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});


let clientSocketIds = []
let connectedUsers = []

io.on("connection", (socket) => {
    // console.log("New connection at" + socket.id);

    socket.on("clientEvent", (data) => {
        ChatController.addConversation(io, data);
    })
})
