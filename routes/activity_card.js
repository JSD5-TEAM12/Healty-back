// const express = require('express')
// const router = express.Router();
// import controller
// const { login,register,update,deleteID,test} = require('../controllers/user')


// router.get('/',test)
// router.post('/create',login)
// router.post('/edit',register)
// router.post('/delete',register)
// router.put('/user/:id',update)
// router.delete('/user/:id',deleteID)

// module.exports = router

const express = require('express')
const router = express.Router();
// import controller
const { read, list, create, update, del } = require('../controllers/activity')
// import middle ware
const {authenticateToken} = require('../middleware/token')


router.get('/activities',authenticateToken,list)
router.get('/activities/:id',authenticateToken,read)
router.post('/activities',authenticateToken,create)
router.put('/activities/:id',authenticateToken,update)
router.delete('/activities/:id',authenticateToken, del)


module.exports = router