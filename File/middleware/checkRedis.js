const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const accessToken = req.cookies.access_token;
  const client = redis.createClient();
  const user = jwt.decode(accessToken);
  if(user === null)
    return res.status(203).send().end();
  console.log(user);
  req.userIdx = user.idx;
  return next();
}
