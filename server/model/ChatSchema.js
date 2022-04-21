const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    from: String,
    to: String,
    key: String, 
    message: String,
    unread: {
        type:Boolean,
        default:true,
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

const Chat = mongoose.model("Chat",chatSchema)
const Convo = mongoose.model("Convo", conversationSchema)

module.exports={Chat, Convo, chatSchema};