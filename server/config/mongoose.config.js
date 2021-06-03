const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/devdb', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
.then(()=>console.log("Successfully connected to the database!"))
.catch((err)=>console.log(err))