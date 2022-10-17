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

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./prehistoric_creatures'))
