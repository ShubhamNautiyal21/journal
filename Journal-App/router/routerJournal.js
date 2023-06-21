
const express = require('express')
const router = express.Router()
const Controller=require('../controller/journalController')
const auth = require('../Middleware/auth')


router.post('/',auth.JWT_Authentication,Controller.Post_Request);
router.post('/SignIn',auth.JWT_Authentication,Controller.Login);
router.get('/',auth.JWT_Authentication,Controller.Get_Request);
router.delete('/:id',auth.JWT_Authentication,Controller.Delete_Request);
router.get('*',auth.JWT_Authentication,Controller.Get_Request);



module.exports = router