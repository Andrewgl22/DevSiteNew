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
        type:String
    },
    icon: {
        //this will be the photo key for the icon on AWS
        type:String
    },
    position:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    skills:{
        type:[String]
    }
}, {timestampes:true})