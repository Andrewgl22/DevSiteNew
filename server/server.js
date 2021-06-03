const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

// const io = require('socket.io')(8000, {
//     cors: {
//         origin: ['http://localhost:3000']
//     },
// })

// io.on('connection', socket =>{
//     console.log(socket.id)
// })

const server = app.listen(8000, ()=>{
    console.log("Server is up and running!")
});

const io = require('socket.io')(server, {cors:true});

io.on("connection", (socket) =>{
    console.log("New connection at" + socket.id);

    socket.on("clientEvent", (data)=>{
        io.emit("message", data);
    })
})

require('dotenv').config();

//photo upload to server with multer and to AWS S3 with aws-sdk

const multer = require('multer');
const upload = multer({dest: 'uploads/'})

require('./config/mongoose.config')
const Routes = require('./routes/user.routes')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

Routes(app);

// app.listen(8000, () => console.log("Listening on port 8000!"));