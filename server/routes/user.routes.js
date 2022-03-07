const Dev = require('../controllers/user.controllers')
const {authenticate, checkUser} = require('../config/jwtconfig')


const multer = require('multer');
const upload = multer({dest:'uploads/'});

// const multerConfig = {
//     storage : multer.diskStorage({
//         destination: function(req,file,cb){
//             cb(null, 'uploads/');
//         },
//     filename : function(req,file,cb){
//         console.log(file);
//         const ext = file.mimetype.split('/')[1]
//         cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
//         }
//     }),
// }

module.exports = (app) => {

    //CRUD commands
    app.get('/api/devs', Dev.getAll),
    app.get('/api/dev/:id', Dev.getOne),
    app.put('/api/update/:id', Dev.update)
    app.delete('/api/delete/:id', Dev.deleteOne)

    app.get('/api/getAllJobs', Dev.getAllJobs)
    app.get('/api/getOneJob/:id', Dev.getOneJob)
    app.post('/api/createjob', Dev.createJob)
    app.delete('/api/deleteJob/:id', Dev.deleteJob)

    //log and reg commands
    app.post('/api/register', Dev.register),
    app.post('/api/login', Dev.login);
    app.get('/api/loggedUser', Dev.getLoggedUser)
    app.get('/api/logout', Dev.logOut);

    app.post('/api/newchat', checkUser, Dev.createChat)

    //gets all messages related to logged user
    app.get('/api/getAllChats', checkUser, Dev.getInbox)


    app.get('/api/count/{id}', Dev.count)

    //grabs specific chat conversation into private room
    app.get('/api/messages/:id/:id2', checkUser, Dev.getFullMessage)
    app.get('/api/messages/:id', checkUser, Dev.getInbox)
    app.delete('/api/messages/delete/:id', Dev.deleteChat)

    app.delete('/api/dev/delete/:id', Dev.deleteDev)

    //sends form photo through multer and uploads to S3
    app.post('/api/upload', upload.single("photo"), Dev.uploadPhoto)
    //upload.single('photo'), this is middleware that I'm pretty sure I don't need

    //grabs specific photo from S3 by id
    app.get('/images/:key', Dev.getPhoto)

    //grabs top 3 headlines from news API
    app.get('/apiKey', Dev.getapi)
}