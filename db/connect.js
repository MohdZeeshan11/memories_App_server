const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const start = async (url)=>{
    try {
        await mongoose.connect(url)
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }

} 

module.exports = start;