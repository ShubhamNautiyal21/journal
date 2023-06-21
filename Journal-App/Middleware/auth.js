let jwt = require('jsonwebtoken');
const { required } = require('nconf');
const secretKey="this$$$$$$$$123is123$$averypowerful123secretkey123$$$$$$thanks"
const path = require('path')
const dirPath = path.join(__dirname, '../views/');


let collectionsList=[]
let id=''
let userName=''

let JWT_Authentication=async (req,res,next)=>{
    id=req.body.id
    console.log('came here',id)
    userName=req.body.userName

    if(id==null || userName==null){
        
            if(req.cookies.accessToken == null || req.cookies.accessToken==''){
                res.sendFile('login.html', {root: dirPath })
            }

            else{
                token=req.cookies.accessToken
                jwt.verify(token, secretKey, function(err, value) {
    
                if(value=="" || value==null){
                    res.sendFile('login.html', {root: dirPath }) 
                }
                else{
                        req.user_id=value.token
                     
                        next()
                }
              });
    
            }
    }
    else{
       
            if(req.cookies.accessToken == null || req.cookies.accessToken==''){
                if(id==null || userName==null)
                {
                    res.sendFile('login.html', {root: dirPath }) 
                }
                
                else{
                   
                    next()
                }
                //Call LogIn Function
            }
            else{
                token=req.cookies.accessToken
                jwt.verify(token, secretKey, function(err, value) {
    
                if(value=="" || value==null){
                    res.sendFile('login.html', {root: dirPath }) 
                }
                else{
                        req.user_id=value.token
                      
                        next()
                }
              });
    
            }
    }

}


module.exports = {
    JWT_Authentication,collectionsList
}