const mongoose=require("mongoose");
const musicSchema=new mongoose.Schema(
    {
        song:{type:String},
        musicdirector:{type:String},
        singers:{type:String},
        yearofrelease:{type:Number},
        
        
});
var musicModel=mongoose.model('music',musicSchema);
module.exports={musicModel}