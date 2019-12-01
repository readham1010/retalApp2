//const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
   // console.log(config.get('mongoDBPasswod'));
    mongoose.connect('mongodb+srv://readham:'+config.get('mongoDBPasswod')+'@cluster0-y7udi.mongodb.net/playground', {// return a promise
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(err => { // mongoose connection error will be handled here
            console.error('App starting error:', err.stack)
        });

}