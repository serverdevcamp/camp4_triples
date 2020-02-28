const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const base62 = require('base62');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const verify = require('../middlewares/verifyToken');

const client = redis.createClient(process.env.REDIS_PORT);


/*
1. emailVerifyCode 를 이용한 Verify
2. emailVerifyCode = '1000000'+ userIdx( users idx) 를 base62 인코딩 하여 생성
3. Redis에 저장하여 Verify. Key = code, Value = idx , expireTime = 10m
 */
router.post('/send', verify, (req,res) => {
  const accessToken = req.body.access_token;
  console.log(accessToken);
  /*
  decoded = {
    userIdx,
    userId
  }
   */
  const decoded = jwt.decode(accessToken);
  console.log(decoded);
  const userIdx = decoded.userIdx;
  const findEmail = models.users.findOne({
    where:{
      idx: userIdx
    }
  }).then(result => {
    const userEmail = result.dataValues.email;
    console.log(userEmail);
    const emailVerifyCode = base62.encode('1000000'+userIdx);
    const transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'yoyoauth@gmail.com',
        pass: 'yoyoadmin123@'
      }
    }));
    const mailOptions = {
      from: 'yoyoauth@gmail.com',
      to: userEmail,
      subject: 'Hello verify your email - yoyo!',
      text: emailVerifyCode
    }
    client.setex(emailVerifyCode, 300, userIdx );
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        console.error(err);
        res.status(500);
        return res.json({res_status: 'internal server error'});
      }
      res.status(200);
      return res.json({access_token:accessToken});
    })
  }).catch(err =>{
    console.error(err);
    res.status(500);
    return res.json({res_status: 'internal server error'});
  })
});

router.post('/verify/:code', verify, (req, res) => {
  const verifyCode = req.params.code;
  const decoded = jwt.decode(req.body.access_token);
  const verify = client.get(verifyCode);
  
  if(verify == null || verify == undefined){
    return res.json({res_status: 'verify code is not matched or expired'})
  }
  
  const verifyEmail = models.users.findOne({
    where:{
      idx: decoded.userIdx
    }
  }).then(result => {
    const updateVerifyEmail = models.users.update({grade : '1'},{
      where:{
        idx: decoded.userIdx
      }
    }).then(result => {
      console.log(result.dataValues);
      res.status(200);
      res.json({access_token:accessToken});
    })
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.json({res_status : 'internal server error - DB'});
  })
  
});
module.exports = router;