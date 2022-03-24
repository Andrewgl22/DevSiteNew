const mongoose = require("mongoos")

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
    icon: {
        //this will be the photo key for the icon on AWS
        type:String
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
        type:[String]
    }
}, {timestamps:true})