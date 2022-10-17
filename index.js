const express= require("express")
const app = express()
const ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

app.use(express.urlencoded({extended: false}));

app.set('view engine', "ejs")
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.listen(8000,()=>{
    console.log('Hey there, delilah')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))
