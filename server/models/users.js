const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    room:{
        type:String,
        rquired:true,
    },
    id:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('UserForChat',userSchema)