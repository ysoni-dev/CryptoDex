const mongoose= require("mongoose")

const amount = new mongoose.Schema({
    amount:{
        type:String,
        minLength:1,
        maxLength:10
    }
})

const MyAmount = new mongoose.model('MyAmount',amount)
module.exports = MyAmount;