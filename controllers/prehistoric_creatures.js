
//import express
const express = require("express")
const router = express.Router();
const fs = require("fs")


router.get("/",(req,res)=>{
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
    myPre.push({type:req.body.type})
    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(myPre));
    res.redirect("/prehistoric_creatures")
  });

router.get("/:id",(req,res)=>{
    let iniDate = fs.readFileSync('dinosaurs.json');
    let myPre = JSON.parse(iniDate)
    const creID = req.params.id
    res.render("prehistoric_creatures/show",{cre: myPre[creID]})

})
router.delete('/:id', (req, res) => {
    let creatures = fs.readFileSync('prehistoric_creatures.json');
    let creData = JSON.parse(creatures);
  
    // remove the deleted dinosaur from the dinosaurs array
    creData.splice(req.params.id, 1)
  
    // save the new dinosaurs to the data.json file
    fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(creData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures');
  });
  router.get("/edit/:id",(req,res)=>{
    let creid= req.params.id
let iniDate = fs.readFileSync('prehistoric_creatures.json')
  let creatures = JSON.parse(iniDate)
  let cre1 = creatures[creid]
  //render page
  res.render('prehistoric_creatures/edit', {cre:cre1, creID:creid})
  })
  router.put("/:id",(req,res)=>{
    let creatures = fs.readFileSync('prehistoric_creatures.json');
  let creData = JSON.parse(creatures);

  //re-assign the name and type fields of the dinosaur to be editted
  creData[req.params.id].type = req.body.type;

   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('prehistoric_creatures.json', JSON.stringify(creData));
  res.redirect('/prehistoric_creatures');
  })
module.exports = router ;
