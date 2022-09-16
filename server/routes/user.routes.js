const Dev = require('../controllers/user.controllers')
const {authenticate, checkUser} = require('../config/jwtconfig')

module.exports = (app) => {

    //CRUD commands
    app.get('/api/devs', Dev.getAll),
    app.get('/api/dev/:id', Dev.getOne),
    app.put('/api/update/:id', Dev.update)
    app.delete('/api/delete/:id', Dev.deleteOne)

    app.get('/api/getAllJobs', Dev.getAllJobs)
    app.get('/api/getOneJob/:id', Dev.getOneJob)
    app.post('/api/createjob', Dev.createJob)
    app.delete('/api/deleteJob/:id', Dev.deleteJob)

    //log and reg commands
    app.post('/api/register', Dev.register),
    app.post('/api/login', Dev.login);
    app.get('/api/loggedUser', Dev.getLoggedUser)
    app.get('/api/logout', Dev.logOut);

    app.delete('/api/dev/delete/:id', Dev.deleteDev)

    //grabs top 3 headlines from news API
    app.get('/apiKey', Dev.getapi)
}