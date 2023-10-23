const express = require('express')
const router = express.Router();
// const cloudinary = require('../utils/cloundunary.js');
const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt')
const cloudinary = require('../utils/cloudinary')
const tb_user = require('../models/users')


// import controller
const { login,register,update,deleteID,test,postimage} = require('../controllers/user')

  
// import verifly token
const {authenticateToken} = require('../middleware/token')



router.get('/',test)
router.post('/login',login)
router.post('/register',upload.single("image"),register)


// router.put('/user/:id',update)
// router.delete('/user/:id',deleteID)

module.exports = router