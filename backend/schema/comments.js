const mongoose=require('mongoose')
const {Schema,model}=mongoose;
const userSchema= new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true}
})
const book= model('Book',bookSchema);
module.exports=book;