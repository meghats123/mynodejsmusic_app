const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
var {musicModel}=require("./model/song")
var app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://megha:test123@cluster0.crp2x.mongodb.net/moviedb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.post('/addMusic',async(req,res)=>{
    try{
        var data=req.body;
        var musicData=new musicModel(data);
        var result=await musicData.save();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }

})
app.get("/viewallMusic",async(req,res)=>{
    try{
        var result=await musicModel.find().exec();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/search",(req,res)=>{
    try{
        musicModel.find(req.body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.json(data)
            }
        })

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/delete",async(req,res)=>{
    try{
        musicModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})
            }
        })

    }
    catch{
        res.status(500).send(error)

    }
})
app.post("/update",async(req,res)=>{
    try{
        musicModel.findByIdAndUpdate(req.body.id,
            {
                song:req.body.song,
                musicdirector:req.body.musicdirector,
                singers:req.body.singers,
                yearofrelease:req.body.yearofrelease,
            },(error,data)=>{
                if(error){
                    throw error
                }
                else{
                    res.json({'status':'success'})
                }
            })
            

    }
    catch(error){
        res.status(500).send(error) 
    }
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Your node js server is running")
})
