const express = require("express")
const router = new express.Router();
const multer = require('multer')
const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SG_KEY)

const Sub=require('../models/submissions')
const User=require('../models/user')

const pdfSub = multer()

let upload=pdfSub.fields([{name:'projProp'}, {name:'endoCert'}, {name:'revCommentsOne'}, {name:'revCommentsTwo'} ])

router.post('/sub/submit', upload, async (req, res) => {
    try {
        // let bufferArray= []
        // req.files.forEach(element => {
        //     bufferArray.push(element.buffer)
        // });
        // const sub=new Sub({title:req.body.title, docs:bufferArray, count:bufferArray.length})
        // await sub.save()
        // response = {
        //     id: sub.id,
        //     count: sub.count,
        //     title: sub.title
        // }

        const tempObj= { ...req.body}

        const email=tempObj.email

        delete tempObj.email

        const user= await User.findOne({email: req.body.email})

        if (!user){
            return res.status(404).send("NO such user");
        }

        tempObj.owner=user.id

        let today= new Date()

        // let d=""+today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()

        // console.log(d)

        let subObj;

        if (req.files['revCommentsOne']===undefined){
            subObj = {
                ...tempObj,
                projProp: req.files['projProp'][0].buffer,
                endoCert: req.files['endoCert'][0].buffer,
                lastDate: today
            }
        }
        
        else {
            subObj = {
                ...tempObj,
                projProp: req.files['projProp'][0].buffer,
                revCommentsOne: req.files['revCommentsOne'][0].buffer,
                revCommentsTwo: req.files['revCommentsTwo'][0].buffer,
                endoCert: req.files['endoCert'][0].buffer,
                lastDate: today
            }
        }

        

        const sub=new Sub(subObj);
        await sub.save()

        const msg= {
            to: 'srcdonline@pilani.bits-pilani.ac.in',
            from: 'bitssrcd@gmail.com',
            subject: 'New submission',
            text: 'Submission received from '+user.email
        }

        const msgalt= {
            to: 'bitssrcd@gmail.com',
            from: 'bitssrcd@gmail.com',
            subject: 'New2 submission',
            text: 'Submission received from '+user.email
        }

        // sgMail.send(msg);  // This line is uncommented on deployed
        
        p=sgMail.send(msgalt);
        // console.log(p);
        


        res.status(200).send({id: sub.id});

    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
})

router.get('/sub/:id/:num',async(req, res)=> {
    try {
        const sub=await Sub.findById(req.params.id)
        // console.log(sub)
        if (!sub){
            return res.status(404).send();
        }

        // console.log(sub)


        res.set('Content-Type','application/pdf')
        if (req.params.num==0){
            res.send(sub.projProp)
        }
        else if (req.params.num==1){
            res.send(sub.revCommentsOne)
        }
        else if (req.params.num==2){
            res.send(sub.revCommentsTwo)
        }
        else if (req.params.num==3){
            res.send(sub.endoCert)
        }
        else {
            res.status(404).send()
        }
        // res.send(sub.docs[req.params.num])
    } catch (e) {
        res.status(500).send()
    }
 })


module.exports=router;