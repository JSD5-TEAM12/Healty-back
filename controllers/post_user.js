const cloudinary = require('../utils/cloudinary.js')

const User_post = require('../models/user_post')
const fs = require('fs')


exports.test = async (req,res) =>{
    res.send('Haloread')
}

exports.read = async(req,res) =>{
    try{

        const postuser = await User_post.find().exec();
        res.send(postuser)
    }catch(err){
        console.log(err)
        res.send('Server error').status(500)
    }
}
exports.create = async(req,res) =>{
    try {

        const {desc,image,user_post_id} = req.body
        const result = await cloudinary.uploader.upload(image, {
            folder: 'react-image',
            public_id: desc,
            resource_type: 'auto'
        })
        const imageUrl = result.secure_url
        
        const cardUser = {
            user_post_id:user_post_id,
            desc:desc,
            image:{
                public_id: desc,
                url: imageUrl,
            }}
            
            const newUserPost = new User_post({
                ...cardUser,
              });
             await newUserPost.save()
        // const postcreate = await User_post(cardUser).save()
        
            res.status(201).send({message:'create user successful',data:newUserPost});
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id; 
      const post = await User_post.findById(postId);
  
      if (!post) {
        return res.status(404).send({ message: 'Post not found' });
      }
      await cloudinary.uploader.destroy(post.image.public_id);
      await User_post.findByIdAndRemove(postId);
  
      res.status(200).send('Post deleted successfully' );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
