const moongose = require('mongoose');

const postSchema = new moongose.Schema({
    title:{
        type:String,
    },
    message:{
        type:String,
    },
    creator:{
        type:String
    },
    tags:{
        type:[String]
    },
    selectedFile:{
        type:String
    },
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
})

module.exports = new moongose.model('Post',postSchema);