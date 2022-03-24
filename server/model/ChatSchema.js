const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    from: String,
    /Users/andrewlederman/Desktop/Dojo/DojoTA/finalProjUpdate/client
    key: String, 
    message: String,
    unread: {
        type:Boolean,
        default:true
    }
    }, {timestamps:true}
)

const chatSchema = new mongoose.Schema({
    user_ids: [String],
    names: [String],
    conversation: [conversationSchema],
})

const userchatSchema = new mongoose.Schema({
    id: String,
    name: String
})
