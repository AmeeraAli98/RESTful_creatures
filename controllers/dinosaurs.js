//import express
const express = require("express")
const router = express.Router();
const fs = require("fs")

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
router.delete('/:idx', (req, res) => {
  let dinosaurs = fs.readFileSync('dinosaurs.json');
  let dinoData = JSON.parse(dinosaurs);

  // remove the deleted dinosaur from the dinosaurs array
  dinoData.splice(req.params.idx, 1)

  // save the new dinosaurs to the data.json file
  fs.writeFileSync('dinosaurs.json', JSON.stringify(dinoData));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
});
router.get('/edit/:idx',(req,res)=>{
  //grab data
  let iniDate = fs.readFileSync('dinosaurs.json')
  let dinos = JSON.parse(iniDate)
  let dino1 = dinos[req.params.idx]
  //render page
  res.render('dinosaurs/edit', {dino:dino1, dinoID:req.params.idx})

})
router.put('/:idx', (req, res) => {
  let dinosaurs = fs.readFileSync('dinosaurs.json');
  let dinoData = JSON.parse(dinosaurs);

  //re-assign the name and type fields of the dinosaur to be editted
  dinoData[req.params.idx].name = req.body.name;
  dinoData[req.params.idx].type = req.body.type;

   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});

module.exports = router ;
