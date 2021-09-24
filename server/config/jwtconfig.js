const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
        jwt.verify(
            req.cookies.usertoken,
            process.env.JWT_SECRET,
            (err, payload) => {
                if (err) {
                    res.status(401).json({ verified: false})
                } else {
                    next();
                }
            }
        )
    };

const checkUser = (req,res,next)  => {
    const cookie = req.cookies.usertoken
    if(cookie){
        console.log("There is a cookie")
        jwt.verify(req.cookies.usertoken,process.env.JWT_SECRET,(err, payload) => {
                if (err) {
                    console.log(err.message)
                    next()
                } else {
                    let user = User.findOneById(payload.id)
                    next();
                } 
            }) 
    } else {
        res.locals.user = null
        next()
    }
};

module.exports = {authenticate, checkUser};
