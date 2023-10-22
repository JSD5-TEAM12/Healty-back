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
router.post('/login',authenticateToken,login)
router.post('/register',upload.single("image"),register)
// router.post('/postimage', upload.single("image"),postimage)

// router.post('/register', upload.single("image"),async (req, res, next) => {
//     try {
//         const register_at = new Date();
//         const hasspass = bcrypt.hashSync(
//             req.body.password, +process.env.SALT_ROUND
//         );
//         const userImage = req.body.image;
//         let image = "";
//         console.log("image =>" + userImage);
//         console.log("body => " + JSON.stringify(req.body));

//         if (!req.body.image) {
//             image = "https://res.cloudinary.com/dldaaqxqf/image/upload/v1697707242/react-image/d5suhjwrhwryaz86xn3c.png";
//         } else {
//             image = await cloudinary.uploader.upload(userImage, {
//                 folder: 'react-image',
//                 resource_type: 'image'
//             }          
//             ).then(result => {
//                 req.body.image = {
//                     public_id: result.public_id,
//                     url: result.secure_url
//                 };
//                 // console.log(result)
//             });
//         }
//         console.log(image)

//         const new_user = { ...req.body, register_at, password: hasspass, image };
//         await tb_user.create(new_user);
//         res.status(201).send('create user successful');
//         res.redirect('/login')

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error');
//         next(error);
//     }
// })


// router.post('/upload', (req, res) => {
//     // Use multer to handle the file upload and store it in req.file.buffer
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file provided' });
//     }
  
//     // Upload the image to Cloudinary
//     cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Image upload failed' });
//       }
  
//       // Send the Cloudinary URL back to the client
//       res.json({ imageUrl: result.secure_url });
//     }).end(req.file.buffer);
//   });

// router.put('/user/:id',update)
// router.delete('/user/:id',deleteID)

module.exports = router