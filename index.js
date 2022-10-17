const express= require("express")
const app = express()
const fs = require("fs")
const ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

app.use(express.urlencoded({extended: false}));

app.set('view engine', "ejs")

app.listen(8000,()=>{
    console.log('Hey there, delilah')
})

app.get("/dinosaurs",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myDinos = JSON.parse(iniDate)
    res.render("dinosaurs/index",{dinos: myDinos})
})
app.get("/prehistoric_creatures",(req,res)=>{
    let iniDate = fs.readFileSync('prehistoric_creatures.json');
    let myPre= JSON.parse(iniDate)
    res.render("prehistoric_creatures/index",{preCre: myPre})
})
app.get("/prehistoric_creatures/new",(req,res)=>{
  
    res.render("prehistoric_creatures/new")

})
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new');
  });
  app.post('/dinosaurs', (req, res) => {
    // read dinosaurs file
    let dinosaurs = fs.readFileSync('dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    // add item to dinosaurs array
    dinoData.push(req.body);
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('dinosaurs.json', JSON.stringify(dinoData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
  });
app.post('/prehistoric_creatures', (req, res) => {
    let iniDate = fs.readFileSync('prehistoric_creatures.json');
    let myPre = JSON.parse(iniDate)
    console.log("hey now"+req.body.type);
    myPre.push({Type:req.body.type})
    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(myPre));
    res.redirect("/prehistoric_creatures")
  });
app.get("/dinosaurs/:id",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myDinos = JSON.parse(iniDate)
    const dinoID = req.params.id
    res.render("dinosaurs/show",{dino: myDinos[dinoID]})

})
app.get("/prehistoric_creatures/:id",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myPre = JSON.parse(iniDate)
    const creID = req.params.id
    res.render("prehistoric_creatures/show",{cre: myPre[creID]})

})

