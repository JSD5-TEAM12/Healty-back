const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const {authenticateToken} = require('../middleware/token')
// import controller
const {read,create,readall,deletepost} = require('../controllers/post_user')

// const {upload} = require('../middleware/Uploads')
// router.get('/postuser',read)
router.get('/post_feed',authenticateToken,readall)
router.get('/read_post/:id,',authenticateToken,read)
router.post('/post',authenticateToken,upload.single("image"),create)
// router.delete('/post/:id',authenticateToken,deletepost)


module.exports = router