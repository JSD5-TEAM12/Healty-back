const activities = require('../models/activity')


exports.list = async (req, res) => {
    try{
        const {id} = req.params
        const activityData = await activities.findById(id)
        if(!activityData){
            return res.status(400).send("not found")
        }
        res.status(200).json(activityData)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.read = async (req, res) => {
    try{
        const id = req.params.id
        const activityData = await activities.find({user_id: id}).exec()
        res.send(activityData)
    }catch(err) {
        console.log(err)
        res.status(500).send('Error')
    }
}

exports.create = async (req, res) => {
    try{
        const {user_id ,title,desc, type, date, duration } = req.body
        const activityData = await  activities({user_id:user_id, title:title, desc:desc,type:type,  date:date, duration:duration}).save()
        res.send(activityData)
    }catch(err){
        console.log(err)
        res.status(500).send('Error')
    }
}

exports.update = async (req, res) => {
    try{
        const {id} = req.params
        const {title, desc,type, date, duration } = req.body 
        const updateActivity = {title, desc,type,  date, duration}
        const lastUpdate_at = new Date()
        updateActivity.lastUpdate_at = lastUpdate_at
        const updated = await activities
            .findOneAndUpdate({_id: id}, updateActivity, {new: true})
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
    }catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}