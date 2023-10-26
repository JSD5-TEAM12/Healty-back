const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();
const {authenticateToken} = require('../middleware/token')
// import controller
const {read,create,readall,deletePost} = require('../controllers/post_user')

// const {upload} = require('../middleware/Uploads')
// router.get('/postuser',read)
// router.get('/post_feed',authenticateToken,readall)
router.get('/read_post',authenticateToken,read)
router.post('/post',authenticateToken,upload.single("image"),create)
router.delete('/delete_post/:id',authenticateToken,deletePost)


module.exports = router