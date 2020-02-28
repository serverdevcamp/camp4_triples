const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const redis = require('redis');
const models = require('../models');
const yymmdd = require('yymmdd');
const verify = require('../middleware/checkRedis');

const client = redis.createClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const currentPath = __dirname;
      const userIdx = req.userIdx;
      const filePath = currentPath+'/../uploads/music/'+userIdx;
      fs.mkdir(filePath, (err) =>{
        if(err) console.error(err);
      });
      cb(null, 'uploads/music/'+userIdx);
    },
    filename: function (req, file, cb) {
      const dotName = file.originalname.split('.');
      
      const fileName = new Date().valueOf()+'_.'+dotName[1];
      req.file_name = fileName;
      cb(null, fileName);
    }
  })
})


router.post('/', verify ,upload.fields([{name: 'music'}, {name: 'img'}]), async (req, res) => {
  
  console.log(req.files.music[0]);
  const body = req.body;
  const userIdx = req.userIdx;
  console.log('post user Idx : '+userIdx)
  const trackName = req.files.music[0].filename;;
  const trackSaved = `http://localhost:7989/static/music/${userIdx}/${trackName}`
  let imgSaved = req.files.img
  
  if(imgSaved == undefined){
    imgSaved = null;
  }
  else{
    imgSaved = `http://localhost:7989/static/music/${userIdx}/${req.files.img[0].filename}`;
  }
  
  const createdDate = yymmdd.yyyy_mm_dd_hh_mm_ss();
  const uploadMusic = await models.tracks.create({
    track_source: trackSaved,
    image: imgSaved,
    users_idx: userIdx,
    created_dt: createdDate
  }).then(result => {
    const dto ={
      accss_token: req.cookies.accss_token,
      tracks_idx: result.dataValues.idx
    };
    res.status(200);
    res.json(JSON.parse(JSON.stringify(dto)));
  }).catch(err => {
    console.log(err);
    return res.send(500);
  });
  
  //console.log('uploaded'+ req.file);
  res.status(200)
  return res.json({state:"OK"}).end();
});




module.exports = router