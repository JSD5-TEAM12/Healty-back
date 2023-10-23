const tb_user = require('../models/users')
const bcrypt = require('bcrypt')
const tokens = require('../utils/token.js')
const cloudinary  = require('../utils/cloudinary.js')

exports.test = async (req, res) => {
    res.send("User is connect")
}


exports.register = async (req, res, next) => {
    try {
        const image = req.body.image;
        const username = req.body.username

        const oldData = await tb_user.findOne({username});
        if(oldData){
            return res.status(409).send("User already exist. Please login!")
        }

        const register_at = new Date();
        const hashpass = bcrypt.hashSync(
            req.body.password, +process.env.SALT_ROUND
        );
        
        const result = await cloudinary.uploader.upload(image, {
            folder: 'react-image',
            public_id: username,
            resource_type: 'auto'
        })
        const imageUrl = result.secure_url

        const new_user = {
            ...req.body,
            register_at,
            password: hashpass,
            image: {
                public_id: username ,
                url: imageUrl,
            },
            email:email.toLowercase()
        };
        await tb_user.create(new_user);
        // console.log(new_user)
        res.status(201).send('create user successful');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        console.log(req.body)

        if (!username || !password) {
            // console.log('User fot found')
            res.status(400).send({
                status: 400,
                message: "Username or password incorrect"
            });
        }


        const findUser = await tb_user.findOne({ username });
        if (!findUser) {
            res.status(404).send({ status: 404, message: "Username or password incorrect" })
            console.log('User fot found')
        }

        const hashedPass = findUser.password;
        const checkPassword = bcrypt.compareSync(password, hashedPass);

        if (!checkPassword)
            res
                .status(400)
                .send({ statusCode: 400, message: "Please check username or password again" });

        //token
        const payload = {
            userId: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname
        }
        const token = tokens.genToken(payload);
        res
            .status(200)
            .send({
                username,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                token,
                message: "login success",
            });

    } catch (error) {
        next(error)
    }
};

exports.update = async (req, res) => {
    try {
        // res.send('Hello update')
        const user_id = req.users._id;

        if (req.body.username) { }

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

exports.deleteID = async (req, res, next) => {
    try {
        if (req.params.userId.length !== 24)
            res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

        const { userId } = req.params;
        const result = await userModel.findByIdAndDelete(userId);

        if (!result)
            res.status(404).send({ message: "user is not found", statusCode: 404 });

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};