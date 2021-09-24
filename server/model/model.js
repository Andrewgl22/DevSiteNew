const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

const conversationSchema = new mongoose.Schema({
    from: String,
    message: String
    }, {timestamps:true}
)

const userchatSchema = new mongoose.Schema({
    id: String,
    name: String
})

const chatSchema = new mongoose.Schema({
    user_ids: [String],
    names: [String],
    conversation: [conversationSchema]
})

const devSchema = new mongoose.Schema({

    // Basic registration info
    
    name:{
        type:String,
        required:[true,'Name is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    address: {
        type:String,
        required:[true,"Address required"]
    },
    city:{
        type:String,
        required:[true,"City is required"]
    },
    state:{
        type:String,
        required: [true,"State is required"]
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },

    // Additional profile information

    bio: {
        type:String,
    },

    skills:{
        type:[String],
    },

    type:{
        type:String
    },

    stackType:{
        type:String
    },

    imageKey:{
        type:String
    },

    website:{
        type:String
    },

    github: {
        type:String
    },

    company: {
        type:String
    },
    messages: [chatSchema],
})

devSchema.virtual("confirmPassword")
.get(() => this._confirmPassword)
.set(value => (this._confirmPassword = value))

devSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password!")
    }
    next();
});

devSchema.pre("save" , function(next) {
    bcrypt
    .hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
});

const Dev = mongoose.model("Dev", devSchema)
const Job = mongoose.model("Job", jobSchema)
const Chat = mongoose.model("Chat",chatSchema)
const Convo = mongoose.model("Convo", conversationSchema)

module.exports={Dev, Chat, Convo, Job};
