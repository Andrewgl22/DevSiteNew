const Dev = require('../model/DevSchema');
const Job = require('../model/JobSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { uploadFile, getFileStream } = require('../S3')
const fs = require('fs');
const axios = require('axios');
// require('dotenv').config();   Once this is loaded in server.js we won't need to run this again  :)

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
    console.log("In update api")
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
    let user = new Dev(req.body);
    console.log(user);
    user.save()
        .then((newUser) => {
            console.log(newUser)
            res.json(newUser);
        })
        .catch((err) => {
            console.log(err)
            // we need to remember to send back the error object as a response  :P
            res.json(err);
        })
}

module.exports.deleteDev = (req,res) => {
    Dev.deleteOne({_id:req.params.id})
    .then((req) => res.json(req))
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
}

module.exports.createJob = (req,res) => {
    let job = new Job(req.body)
    job.save()
        .then((req)=>res.json(req))
        .catch((err) => {
            console.log("Error in create job")
            console.log(err);
            res.status(400).json(err);
        })
}

// use matchJobPercentage function here
// add percentage attribute to each job
// sort by percentage
// then send to front end for rendering
module.exports.getAllJobs = (req,res) => {
    Job.find()
    .then((req)=>{
        // for each job in the response:
        // calculate percentage match with loggedInUser
        // add percentage on to each job
        res.json(req)
    })
    .catch((err) => console.log(err))
}

module.exports.getOneJob = (req,res) => {
    Job.findById({_id:req.params.id})
    .then((req)=>{
        console.log("In getOneJob")
        res.json(req)
    })
    .catch((err) => console.log(err))
}

module.exports.deleteJob = (req,res) => {
    Job.deleteOne({_id:req.params.id})
    .then((req) => res.json(req))
    .catch((err) => console.log(err))
}

module.exports.login = async (req,res) => {
    console.log(req.body)
    // let reqPass = await bcrypt.hash(req.body.password, 10);

    Dev.findOne({email: req.body.email})
        .then(user=>{
            if (user === null){
                res.status(400).json({message:'Invalid login attempt'})
            } else {
                // console.log(`req pw:  ${reqPass}`);
                // console.log(`user pw: ${user.password}`);
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
                    .catch( err => {
                        console.log('error from bcrypt compare:');
                        console.log(err);
                        res.status(400).json({msg : "Invalid login attempt"})
                    });
            }
            })
        .catch(err => res.json(err));
    }

module.exports.logOut = (req, res) => {
    console.log("In logout controller")
    res.cookie('usertoken', 'none', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
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
        const key = process.env.DATA_API_KEY;
        // console.log(key);
        const result = await axios.get(`https://newsapi.org/v2/everything?q=programming&apiKey=${key}`);
        return res.json(result.data);
    } catch {
        console.log('Something went wrong')
    }
}


module.exports.uploadPhoto = async (req,res) => {
    try {
        console.log(req.file)
        const file = req.file
        const result = await uploadFile(file)
        // console.log(result)
        res.json({imageKey: result.key})
    } catch(err) {
        console.error(err)
        console.log('there is an error in the upload photo method')
    }
}

module.exports.getPhoto = async (req,res) => {
    try {
        const key = req.params.key
        console.log(key)
        const readStream = getFileStream(key)
        readStream.pipe(res)
    } catch(err) {
        console.error(err)
        console.log("getPhoto method error")
    }
}