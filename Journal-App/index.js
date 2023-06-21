const express = require('express')
const app = express()
const cookieParser  = require('cookie-parser')
const journalRouter=require('./router/routerJournal')
const mongoose =  require('mongoose')
const url='mongodb+srv://admin:admin123@cluster0.vjtmnof.mongodb.net/Node_ES?retryWrites=true&w=majority';
const path = require('path')
const cors = require('cors')

app.use(cors())

app.use(express.static(path.join(__dirname,"/views")))
app.set('view engine', 'ejs');
app.use(express. json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>
app.listen(process.env.PORT || 2100,()=>{
    console.log(`app is live`);}))
    .catch((err)=>console.log(err));
    

   
    app.use(journalRouter)