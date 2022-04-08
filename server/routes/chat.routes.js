const Chat = require('../controllers/chat.controllers')
const {authenticate, checkUser} = require('../config/jwtconfig')


module.exports = (app) => {
	app.post('/api/chats/newchat', checkUser, Chat.createChat)

	//gets all messages related to logged user
	app.get('/api/chats/getAllChats', Chat.getAll)
	app.get('/api/chats/messages/:id', Chat.getInbox)

	//grabs specific chat conversation into private room
	app.get('/api/chats/messages/:id/:id2', Chat.getFullMessage)
	app.delete('/api/chats/messages/delete/:id', Chat.deleteChat)

	app.get('/api/chats/count/:id', Chat.count)
    app.get('/api/chats/update/:id/:id2', Chat.updateUnread);


}



