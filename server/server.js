const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const {Chat, Convo} = require('./model/model');

// const io = require('socket.io')(8000, {
//     cors: {
//         origin: ['http://localhost:3000']
//     },
// })

const server = app.listen(8000, ()=>{
    console.log("Server is up and running!")
});

// SOCKET.IO SERVER EVENTS

const io = require('socket.io')(server, {cors:true});

let clientSocketIds = []
let connectedUsers = []

io.on("connection", (socket) => {
    console.log("New connection at" + socket.id);

    socket.on("clientEvent", (data) => {
        const chatcheck = Chat.exists({ user_ids: { $all: [ data.to , data.from ] } }).then(function(res){
            if(res == true){
                Chat.findOneAndUpdate({ user_ids: { $all: [ data.to , data.from ] } }, {$push:{conversation: {from:data.from,message:data.msg}}})
                    .then(()=>console.log("Updated existing Chat document with new message"))
                    .catch((err)=>res.json(err))
                
            }
    
            else {
                console.log("In create else statement")
                Chat.create({user_ids: [data.to,data.from], names:[data.name1,data.name2], conversation: [{from:data.from,message:data.msg}]})
                    .then(console.log("New Chat document created in database"))
                    .catch((err) => console.log(err))
            }
        })

        //have to figure out how to emit only to the specific user
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