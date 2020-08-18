const express = require("express")
const router = new express.Router();

const User=require('../models/user')

router.post('/users', async (req, res)=> {
    const user = new User(req.body);
    
    try {
        await user.save()
        res.status(201).send();
    } catch (e) {
        res.status(400).send();
    }
})

router.get('/users/me', async (req, res)=> {
    try {
        const _id=req.body.id;
        console.log(_id)
        const user = await User.findById(_id);

        res.status(200).send(user)
    } catch (e) {
        res.status(400).send();
    }
})

module.exports = router