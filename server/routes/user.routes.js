const Dev = require('../controllers/user.controllers');
const {authenticate} = require('../config/jwt.config')

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
    app.get('/api/devs', Dev.getAll),
    app.get('/api/dev/:id', Dev.getOne),
    app.put('/api/update/:id', Dev.update)
    app.delete('/api/delete/:id', Dev.deleteOne)
    app.post('/api/register', Dev.register),
    app.post('/api/login', Dev.login);
    app.post('/api/logout', Dev.logOut);

    app.post('/api/loggedUser', Dev.getLoggedUser)

    app.delete('/api/dev/delete/:id', Dev.deleteDev)

    app.post('/api/upload', upload.single('photo'), Dev.uploadPhoto)
    app.get('/images/:key', Dev.getPhoto)

    app.get('/apiKey', Dev.getapi)
}