const express =  require("express")
const bodyparser =require("body-parser")
const app =express()
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended: true}))
var date = new Date()
var dayNum  = date.getDay()
var dayName = ""
var i=[];
app.get("/",function(req,res){
    switch (dayNum) {
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        case 4:
            dayName = "Thursday";
            break;
        case 5:
            dayName = "Friday";
            break;
        case 6:
            dayName = "Saturday";
            break;
        case 0:
            dayName = "Sunday";
            break;
        default:
            dayName = "Invalid day";
    }
   if(dayName==="Saturday"|| dayName==="Sunday"){
    var type ="Weekend";
    res.render("index",{Day:dayName,Type: type,newItems: i })
   }
   else{
    var type ="Weekday";
    res.render("index",{Day:dayName,Type: type,newItems: i })
   }
})
app.post("/",function(req,res){
 var item = req.body.ni
 i.push(item);
console.log(i)
res.redirect("/")
})
app.listen(3000,function(){
    console.log("server stared")
})




