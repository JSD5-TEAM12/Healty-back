const activities = require('../models/activity')


exports.list = async (req, res) => {
    try{
        // const user_id = req.params.id
        // const {user_id, type, desc, date, duration, } = req.body
        // const activityData = await activities.find({user_id:user_id, type:type, desc:desc, date:date, duration:duration}).exec()
        const activityData = await activities.find({}).exec()
        res.send(activityData)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.read = async (req, res) => {
    try{
        const id = req.params.id
        console.log('id in read backend:>> ', id);
        // const user_id = req.body.id
        // const activityData = await activities.findOne({_id:id}).exec()
        const activityData = await activities.find({user_id: id}).exec()
        res.send(activityData)
        console.log(activityData);
    }catch(err) {
        console.log(err)
        res.status(500).send('Error')
    }
}

exports.create = async (req, res) => {
    try{
        const {user_id,type, desc, date, duration, } = req.body
        const activityData = await  activities({user_id:user_id, type:type, desc:desc, date:date, duration:duration}).save()
        console.log('user_id :>> ', user_id,req.body);
        res.send(activityData)
        console.log(req.body.date)
    }catch(err){
        console.log(err)
        res.status(500).send('Error')
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id
        const updated = await activities
            .findOneAndUpdate({_id: id}, req.body, {new: true})
            .exec()
        res.send(updated)
    }catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.del = async (req, res) => {
    try{
        const id = req.params.id
        const removed = await activities.findOneAndDelete({_id: id}).exec()
        res.send(removed)
        console.log(id)
    }catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}