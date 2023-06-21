const mongoose =  require('mongoose')
let collections=['']
const auth = require('../Middleware/auth')
mongoose.connection.on('open', function (ref) {
   
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        names.forEach((collection)=>{
           
            auth.collectionsList.push(collection.name)
            
        })
     
       
    });

})
