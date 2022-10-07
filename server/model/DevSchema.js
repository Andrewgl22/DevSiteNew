const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { chatSchema } = require('./ChatSchema'); 

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
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
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

module.exports = Dev;
