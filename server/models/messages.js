const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    text:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('message',messageSchema)