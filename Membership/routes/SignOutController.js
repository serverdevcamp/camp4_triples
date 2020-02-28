const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const verify = require('../middlewares/verifyToken');

const client = redis.createClient(process.env.REDIS_PORT);

router.post('/', (req,res) => {
  const accessToken = req.body.access_token;
  res.status(200);
  return res.json({access_token: accessToken});
})  

module.exports = router;