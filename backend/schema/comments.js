const mongoose=require('mongoose')
const {Schema,model}=mongoose;
const commentSchema= new Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    rating:{type:String,required:true},
    comment:{type:String,required:true},
})
const comment= model('comment',commentSchema);
module.exports=comment;



