var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/Database');

var db = mongoose.connection

db.on('error',() => console.log("Error in Connecting to Database"))
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name
    var email = req.body.email
    var phno = req.body.phno
    var password = req.body.password
    var gender = req.body.gender
    var Qualification=req.body.Qualification


    var data ={
        "name":name,
        "gender":gender,
        "email":email,
        "phno":phno,
        "password":password,
        "gender":gender,
        "Qualification":Qualification

    }

    db.collection('users').insertOne(data,(err,collection) =>{
        if(err){
            throw err;
        }
        console.log("Record Inserted successfully");
    })

    return res.redirect('signup_successful.html')
})
app.get("/",(req,res) => {
    res.set({
        "ALLOw-access-ALLOw_Origin":'*'
    })
    return res.redirect('index.html');
}).listen(5000);


console.log("Listening on port 5000")