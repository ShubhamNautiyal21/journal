
const journalSchema =  require('../models/journal')
const collections=require('../models/collections')
const mongoose =  require('mongoose')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('01110100 01101000 01101001 01110011 00100000 01101001 01110011 00100000 01100001 00100000 01110110 01100101 01110010 01111001 00100000 01110011 01110100 01110010 01101111 01101110 01100111 00100000 01100101 01101110 01100011 01110010 01111001 01110000 01110100 01101001 01101111 01101110 00100000 01101011 01100101 01111001');
const path = require('path')
const jwt = require('jsonwebtoken')
const secretKey="this$$$$$$$$123is123$$averypowerful123secretkey123$$$$$$thanks"
const dirPath = path.join(__dirname, '../views/');

let data =[]
let Journal=''
let userId='';
let userName='';

const express = require('express')
var app = express()
var cookieParser  = require('cookie-parser')
app.use(cookieParser())



let Login=async (req,res)=>{

            this.userId=req.body.id
            this.userName=req.body.userName
            console.log('User Name to connect to the App :- ',this.userName);
            let token= await jwt.sign({token:this.userId},secretKey)
            res.cookie('accessToken',token,{
                expires:new Date(Date.now()+950400),
                httpOnly:true,
                secure:false
                // ,
                // secure:true
            })
            req.user_id=this.userId
           
          
            Get_Request(req,res)
        
   
        
}

let Get_Request=(req,res)=>{
    
    Data_Fetcher(req,res)
}

let Data_Fetcher=(req,res)=>{

    if(req.user_id==null || req.user_id=="")
        return;

   
        Journal = mongoose.model( req.user_id ,journalSchema)
        Journal.find()
        .then((result)=>
            
             result.forEach((item)=>     
                data.push({id:item._id,content:cryptr.decrypt(item.content),date:item.createdAt.toString().slice(0,24),smiley:item.smiley})),
                
          ).then((reverse)=>data=data.reverse()).then((uData)=>{
            res.render('index',{title:"Welcome | Daily Journal",heading:`JOURNALS`,data}),
          data=[]})
        .catch((err)=>res.send('ERROR ! while getting journal, please try again.'+err))
}


let Post_Request=(req,res)=>{


    if(req.user_id==null || req.user_id=="")
    return;

    Journal = mongoose.model(req.user_id,journalSchema)
    let smileyContent=''

    if(req.body.smileyParent==="" ||req.body.smileyParent===undefined ){
        smileyContent=0
    }
    else
    {
        smileyContent=req.body.smileyParent
    }
   
     let journal = new Journal({
         content: cryptr.encrypt(req.body.content),
         smiley:smileyContent
     })
     journal.save()
     .then((result)=>
        Get_Request(req,res))
     .catch((err)=>res.send('ERROR ! , while creating journal, please try again.'+err))
}

let Delete_Request=(req,res)=>{

    if(req.user_id==null || req.user_id=="")
        return;

    Journal = mongoose.model(req.user_id,journalSchema)
    let deleteId=req.params.id

    Journal.findByIdAndDelete(deleteId)
    .then(result=>{
        Get_Request(req,res)
    })
    .catch((err)=>res.send('ERROR ! , while deleting journal, please try again.'))
    
}

module.exports=
{
    Get_Request,
    Post_Request,
    Delete_Request,
    Login
}