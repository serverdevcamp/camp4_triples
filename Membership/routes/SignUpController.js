const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const verify = require('../middlewares/verifyToken');
const yymmdd = require('yymmdd');

/*******************
 * DB ATTRIBUTE
 * users = {
 *   idx
 *   userId - V
 *   pw - V
 *   nickname - V
 *   email - V
 *   profile
 *   salt
 *   followerCount
 *   followingCount
 *   tracksCount
 *   grade
 *   status
 *   createdAt
 *   accessDt
 *   updatedDt
 *   refreshToken
 * }
 *******************/

router.post("/check_email", function (req, res, next) {
  const body = req.body;
  const checkEmail = models.users.findOne({
    where: {
      email: body.email
    }
  }).then(result => {
    if (result == null || result == undefined) {
      res.status(200);
      return res.json({res_status: 'available'});
      
    } else {
      res.status(204);
      return res.json({res_status: 'already exist'});
    }
  }).catch(err => {
    res.status(500);
    return res.send('internal server error');
  })
})

router.post("/check_id", function (req, res, next) {
  const body = req.body;
  const checkId = models.users.findOne({
    where: {
      user_id: body.id
    }
  }).then(result => {
    if (result == null || result == undefined) {
      res.status(200);
      return res.json({res_status: "available"});
    } else {
      res.status(204);
      return res.json({res_status: "already exist"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.json({res_status: "internal server error"});
  })
})

router.post('/', async function (req, res, next) {
  const body = req.body;
  console.log(body);
  const checkEmail = await models.users.findOne({
    where: {
      email: body.email
    }
  }).then(result => {
    return result;
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.json({res_status: "internal server error"});
  })
  if(checkEmail != null || checkEmail != undefined)
    return res.status(204).send();
  const checkId = await models.users.findOne({
    where: {
      user_id: body.id
    }
  }).then(result => {
    return result;
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.json({res_status: "internal server error"});
  })
  if(checkId != null || checkId != undefined)
    return res.status(203).send();
  
  // make a HashPassword
  const salt = crypto.randomBytes(32).toString('base64');
  const hashPassword = crypto.createHash('sha256').update(salt + body.pass).digest('base64');
  const date = yymmdd.yyyy_mm_dd_hh_mm_ss();
  const createUser = await models.users.create({

    user_id: body.id,
    pw: hashPassword,
    nickname: body.nickname,
    email: body.email,
    profile: `{"profile_pic":"","background_pic":"","texts":"","contact_link":""}`,
    salt: salt,
    created_dt: date

  }).then(result => {
    const dto = {
      access_token: "",
      idx: result.dataValues.idx,
      email: result.dataValues.email,
      user_id: result.dataValues.user_id
    }
    return res.json(dto);
  }).catch(err => {
    console.error(err);
    res.status(500);
    res.json({res_status: "internal server error"});
  })
})

module.exports = router;