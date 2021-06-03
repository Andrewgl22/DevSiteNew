const Dev = require('../model/model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { uploadFile, getFileStream } = require('../S3')
const fs = require('fs');
const axios = require('axios')
require('dotenv').config();

module.exports.getAll = (req,res) => {
    Dev.find()
    .then((req)=>res.json(req))
    .catch((err)=>console.log(err))
}

module.exports.getOne = (req,res) => {
    Dev.findById({_id:req.params.id})
    .then((req)=>res.json(req))
    .catch((err)=>console.log(err))
}

module.exports.update = (req,res) => {
    Dev.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
    .then((req)=> res.json(req))
    .catch((err)=>res.json(err))
}

module.exports.deleteOne = (req,res) => {
    Dev.deleteOne({_id:req.params.id})
    .then((req)=> res.json(req))
    .catch((err)=>res.json(err))
}

module.exports.register = (req,res) => {
    Dev.create(req.body)
    .then((req)=>res.json(req))
    .catch((err) => console.log(err))
}

module.exports.deleteDev = (req,res) => {
    Dev.deleteOne({_id:req.params.id})
    .then((req) => res.json(req))
    .catch((err) => console.log(err))
}

module.exports.login = (req,res) => {
    Dev.findOne({email: req.body.email})
    .then(user=>{
        if (user === null){
        res.status(400).json({message:'Invalid login attempt'})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
                if (passwordIsValid) {
                    res. 
                    cookie(
                        'usertoken',
                        jwt.sign({_id: user._id}, process.env.JWT_SECRET),
                        {
                        httpOnly: true
                        }
                    )
                    .json({msg: "success!"});
                    } else {
                    res.status(400).json({msg: "Invalid login attempt"})
                    }
                })
                .catch( err => 
                    res.status(400).json({msg : "Invalid login attempt"})
                );
            }
            })
            .catch(err => res.json(err));
        }

module.exports.logOut = (req, res) => {
    res
    .cookie("usertoken", jwt.sign({_id:""}, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0
    })
    .json({msg: "ok"});
    }


module.exports.getLoggedUser = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true });
    Dev.findById(decodedJWT.payload._id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports.getapi = async (req,res) => {
    try {
    const key = process.env.DATA_API_KEY
    console.log(key)
    const result = await axios.get(`https://newsapi.org/v2/everything?q=programming&apiKey=${key}`)
    return res.json(result.data)
    } catch {
        console.log('Something went wrong')
    }
}


module.exports.uploadPhoto = async (req,res) => {
    try {
        console.log(req.file)
    const file = req.body
    console.log(file)
    const result = await uploadFile(file)
    console.log(result.key)
    // res.json({key:result.key})
    } catch {
        console.log('there is an error in the upload photo method')
    }
 
}

module.exports.getPhoto = (req,res) => {
    const key = req.params.key
    console.log(key)
    const readStream = getFileStream(key)
    readStream.pipe(res)
    console.log(readStream)
}