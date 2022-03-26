const {Chat} = require('../model/ChatSchema');
const jwt = require('jsonwebtoken')

//this is for only if the chats are to be referenced, separate documents instead of embedded
module.exports.createChat = (req,res) => {
    Chat.create(req.body)
    .then((req)=>res.json(req))
    .catch((err) => console.log(err))
}

module.exports.getInbox = (req,res) => {
    Chat.find({})
    .then((req)=>res.json(req))
    .catch((err)=>console.log(err))
}

module.exports.getFullMessage = (req,res) => {
    Chat.find({user_ids:{$all: [req.params.id,req.params.id2]}})
    .then((req)=>res.json(req))
    .catch((err) => console.log(err))
}

module.exports.deleteChat = (req,res) => {
    Chat.deleteOne({_id:req.params.id})
    .then((req)=>res.json(req))
    .catch((err) => console.log(err))
}

module.exports.count = (req,res) => {
    Chat.aggregate([{$match:{user_ids:req.params.id}},{$unwind:"$conversation"},{$match:{"conversation.to":req.params.id}},{$group:{_id:"$conversation.unread",count:{$sum:1}}},{$match:{_id:true}}])
	.then((req)=>{
		console.log("count: " + req[0].count)
		res.json(req[0].count)
	})
	.catch((err) => console.log(err))
}

module.exports.updateUnread = (req,res) => {
	
}

module.exports.addConversation = (io, data) => {
		console.log('addConversation data:');
		console.log(data);
		const chatcheck = Chat.exists({ user_ids: { $all: [ data.to , data.from ] } }).then(function(res){
				if(res == true){
						Chat.findOneAndUpdate({ user_ids: { $all: [ data.to , data.from ] } }, 
								{
									$push: {
										conversation: {
											from:data.from, 
											to:data.to,
											key:data.key, 
											unread:true,
											message:data.msg
										}
									}
								}
							)
								.then(()=> {
									console.log("Updated existing Chat document with new message")
									// emit / send the original data out to listening sockets
									io.emit("message", data);
								})
								.catch((err)=>res.json(err))
						
				}

				else {
						console.log("In create else statement")
						Chat.create({
							user_ids: [data.to,data.from], 
							names:[data.name1,data.name2], 
							conversation: [{
								from:data.from, 
								key:data.key, 
								message:data.msg
							}]
						})
								.then(() => {
									console.log("New Chat document created in database")
									// emit / send the original data out to listening sockets
									io.emit("message", data);
								})
								.catch((err) => console.log(err))
				}
		})
		io.emit("message", data);

}

