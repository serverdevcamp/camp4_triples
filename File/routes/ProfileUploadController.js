const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const redis = require('redis');
const models = require('../models');

const verify = require('../middleware/checkRedis');

const client = redis.createClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const currentPath = __dirname;
      const userIdx = req.userIdx;
      const filePath = `${currentPath}/../uploads/profile/${userIdx}`;
      fs.mkdir(filePath, (err) =>{
        if(err) console.error(err);
      });
      cb(null, `uploads/profile/${userIdx}`);
    },
    filename: function (req, file, cb) {
      const dotName = file.originalname.split('.')
      cb(null, new Date().valueOf()+'_.'+dotName[1]);
    }
  })
})

router.post('/', verify ,upload.fields([{name: 'profile_img'}]), async (req, res) => {
  const userIdx = req.userIdx;
  res.json({res_status: 'file uploaded'});
  const getProfile = await models.users.findOne({
    where:{
      idx: userIdx
    }
  }).then(result => {
    console.log(result.dataValues.profile);
    const imgName = req.files.profile_img[0].filename;
    const savedImg = `http://localhost:7989/static/profile/${userIdx}/${imgName}`;
    const previousProfile = result.dataValues.profile;
    
    '{"profile_pic":"${savedImg}","background_pic":"","texts":"","contact_link":""}'
    
    let updatedProfile = JSON.parse(previousProfile);
    updatedProfile.profile_pic = savedImg;
    updatedProfile = JSON.stringify(updatedProfile);
    updatedProfile = `${updatedProfile}`;
    console.log('else: '+updatedProfile)
    
    
    const updateProfileImg = models.users.update({profile: updatedProfile},{
      where: {
        idx: userIdx
      }
    }).then(result =>{
      console.log(result);
    }).then(err => {
      console.error(err);
      res.status(500).send().end();
    })
  }).then( err => {
    console.error(err);
    res.status(500).send().end();
  })
  //const profile = `{"profile_pic":"${files}","background_pic":, "texts":, "contact_link":""}`
  //const updateProfileImg = models.user.update({})
  res.status(200).send().end();
});

router.post('/bg', upload.fields([{name: 'bg_img'}]), (req, res) => {
  console.log(req.files);
  res.json({res_status: 'file uploaded'});
});




module.exports = router