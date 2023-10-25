const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();


// import controller
const { login,register,update,deleteID,test,Getchart,getUser} = require('../controllers/user')

  
// import verifly token
const {authenticateToken} = require('../middleware/token')


// login and register
router.get('/',test)
router.post('/login',login)
router.post('/register',upload.single("image"),register)

// Get user profile
router.get('/profile/:id',authenticateToken,getUser)

// Chart
router.get('/',authenticateToken,Getchart)


// router.put('/user/:id',update)
// router.delete('/user/:id',deleteID)

module.exports = router