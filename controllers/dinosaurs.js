//import express
const express = require("express")
const router = express.Router()
router.get("/",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myDinos = JSON.parse(iniDate)
    res.render("dinosaurs/index",{dinos: myDinos})
})
router.get('/new', (req, res) => {
    res.render('dinosaurs/new');
  });
  router.post('/', (req, res) => {
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
router.get("/:id",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myDinos = JSON.parse(iniDate)
    const dinoID = req.params.id
    res.render("dinosaurs/show",{dino: myDinos[dinoID]})

})
module.exports = router