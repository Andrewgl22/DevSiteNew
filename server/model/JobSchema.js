const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    //need to store id and name of creator
    createdBy: {
        id: {
            type:String
        },
        name: {
            type:String
        }
    },
    company:{
        type:String,
        required:[true, "Company is required"]
    },
    position:{
        type:String,
        required:[true, "Position is required"]
    },
    description:{
        type:String,
        required:[true, "Description is required"]
    },
    location:{
        type:String,
        required:[true, "Location is required"]
    },
    skills:{
        type:[String],
        required:[true,"Skills are required"],
        validate: [(value) => value.length > 0, 'You must choose at least 1 skill']
    }
}, {timestamps:true})

const Job = mongoose.model("Job", jobSchema)
module.exports= Job;