//const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    
    mongoose.connect('mongodb+srv://readham:White123@cluster0-y7udi.mongodb.net/playground', {// return a promise
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