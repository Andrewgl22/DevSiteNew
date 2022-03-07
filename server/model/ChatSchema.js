const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    from: String,
    key: String, 
    message: String,
    unread:Boolean
    }, {timestamps:true}
    
)

const chatSchema = new mongoose.Schema({
    user_ids: [String],
    names: [String],
    conversation: [conversationSchema]
})

const userchatSchema = new mongoose.Schema({
    id: String,
    name: String
})
