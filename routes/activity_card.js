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


router.get('/activities', list)
router.get('/activities/:id', read)
router.post('/activities', create)
router.put('/activities/:id', update)
router.delete('/activities/:id', del)


module.exports = router