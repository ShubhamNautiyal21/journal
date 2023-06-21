const mongoose =  require('mongoose')
const schema =  mongoose.Schema;

const journalSchema = new schema({
    content:{
        type:String,
        required:true
    },
    smiley:{ 
        type:String,
        required:true
    }
  
},{timestamps:true})



module.exports = journalSchema;