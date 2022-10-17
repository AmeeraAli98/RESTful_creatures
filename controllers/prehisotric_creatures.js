
//import express
const express = require("express")
const router = express.Router()
app.router("/",(req,res)=>{
    let iniDate = fs.readFileSync('prehistoric_creatures.json');
    let myPre= JSON.parse(iniDate)
    res.render("prehistoric_creatures/index",{preCre: myPre})
})
router.get("/new",(req,res)=>{
  
    res.render("prehistoric_creatures/new")

})

 
router.post('/', (req, res) => {
    let iniDate = fs.readFileSync('prehistoric_creatures.json');
    let myPre = JSON.parse(iniDate)
    console.log("hey now"+req.body.type);
    myPre.push({Type:req.body.type})
    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(myPre));
    res.redirect("/prehistoric_creatures")
  });

router.get("/:id",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myPre = JSON.parse(iniDate)
    const creID = req.params.id
    res.render("prehistoric_creatures/show",{cre: myPre[creID]})

})

