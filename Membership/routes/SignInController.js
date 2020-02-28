const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const verify = require('../middlewares/verifyToken');

const client = redis.createClient(process.env.REDIS_PORT);


//---GET---
router.get('/', function (req, res, next) {
  res.render("login.html");
});


//---POST---
router.post("/", function (req, res, next) {
  console.log(req.body);
  const body = req.body;
  const result = models.users.findOne({
    where: {
      email: body.email
    }
  }).then(result => {
    if (result == null || result == undefined) {
      // Login Failed
      res.status(203);
      return res.json({res_status: "email is not exist"});
      
    } else {
      const userIdx = result.dataValues.idx;
      const userId = result.dataValues.user_id;
      const dbPassword = result.dataValues.pw;
      const inputPassword = body.pass;
      const salt = result.dataValues.salt;
      const hashPassword = crypto.createHash('sha256').update(salt+inputPassword).digest('base64');
      
      if(dbPassword == hashPassword){
        console.log("password correct");
        res.status(200);
        const dto = {
          access_token: "",
          idx: result.dataValues.idx,
          email: result.dataValues.email,
          user_id: result.dataValues.user_id
        }
        return res.json(dto);
      }
      else{
        res.status(204);
        return res.json({res_status: "incorrect password"});
      }
    }
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.json({res_status: "internal server error"});
  })
})
module.exports = router;