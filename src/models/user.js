const mongoose=require("mongoose")

const User=mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String
    }
})

module.exports = User