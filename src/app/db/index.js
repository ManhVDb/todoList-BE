const mongoose = require('mongoose');
const config = require("../config")
async function connect(){
    try {
        await mongoose.connect(`mongodb://${config.mongoDB.host}:${config.mongoDB.port}/dataSharing`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
    });
         console.log('Connect successfully!!!')
    } catch (error) {
         console.log('Connect failure!!!')        
    }
}

module.exports={connect};