const Dev = require('../controllers/user.controllers')
const {authenticate, checkUser} = require('../config/jwtconfig')

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

const multer = require('multer');
const upload = multer({dest:'uploads/'});

module.exports = (app) => {
    //sends form photo through multer and uploads to S3
    app.post('/api/upload', upload.single("photo"), Dev.uploadPhoto)
    
    //grabs specific photo from S3 by id
    app.get('/api/images/:key', Dev.getPhoto)
}
