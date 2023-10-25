const activities = require('../models/activity')


exports.list = async (req, res) => {
    try{
        const {id} = req.params
        console.log(id);
        // const {user_id, type, desc, date, duration, } = req.body
        // const activityData = await activities.find({user_id:user_id, type:type, desc:desc, date:date, duration:duration}).exec()
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
        // console.log('id in Read backend:>> ', id);
        // const user_id = req.body.id
        // const activityData = await activities.findOne({_id:id}).exec()
        const activityData = await activities.find({user_id: id}).exec()
        res.send(activityData)
        // console.log(activityData);
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



// exports.create = async (req, res) => {
//     try {
//         const { user_id, type, desc, date, duration, created_at } = req.body;

//         const activityData = new activities({
//             user_id: user_id, 
//             type: type,
//             desc: desc,
//             date: date,
//             duration: duration,
//             created_at: created_at,
//         });

//         const savedActivity = await activityData.save();
//         res.send(savedActivity);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// }

exports.update = async (req, res) => {
    try{
        const {id} = req.params
        const {type, desc, date, duration } = req.body 
        const updateActivity = {type, desc, date, duration}
        const lastUpdate_at = new Date()
        updateActivity.lastUpdate_at = lastUpdate_at
        console.log('update',id)
        // const cardId = req.body._id
        const updated = await activities
            .findOneAndUpdate({_id: id}, updateActivity, {new: true})
            .exec()
        res.send(updated)
    }catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

// exports.update = async (req, res) => {
//     try {
//         const user_id = req.params.id; // Assuming user_id is in the URL parameters
//         const { type, desc, date, duration } = req.body;
//         const updated = await activities
//             .findOneAndUpdate({ user_id: user_id }, { type, desc, date, duration }, { new: true })
//             .exec();
//         res.send(updated);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server Error');
//     }
// }

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