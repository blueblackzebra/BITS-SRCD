const express = require("express")
const router = new express.Router();
const multer = require('multer')

const Sub=require('../models/submissions')
const pdfSub = multer()

router.post('/submit/', pdfSub.array('docs'), async (req, res) => {
    try {
        let bufferArray= []
        req.files.forEach(element => {
            bufferArray.push(element.buffer)
        });
        const sub=new Sub({title:req.body.title, docs:bufferArray, count:bufferArray.length})
        sub.save()
        response = {
            id: sub.id,
            count: sub.count,
            title: sub.title
        }
        res.status(200).send(response);

    } catch (e) {
        res.status(500).send();
    }
})

router.get('/check/:id/:num',async(req, res)=> {
    try {
        const sub=await Sub.findById(req.params.id)
        // console.log(sub)
        if (!sub){
            return res.status(404).send();
        }


        res.set('Content-Type','application/pdf')
        res.send(sub.docs[req.params.num])
    } catch (e) {
        res.status(500).send()
    }
 })


module.exports=router;