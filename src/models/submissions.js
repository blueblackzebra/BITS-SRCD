const mongoose=require("mongoose")

const Submission=mongoose.model('Submission', {
    title: {
        type: String,
        required: true
    },
    docs: {
        type: [Buffer],
        required: true
    },
    count: {
        type: Number,
        required: true
    }

})

module.exports = Submission