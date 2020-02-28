const jwt = require('jsonwebtoken');
const redis = require('redis');
const models = require("../models");

const client = redis.createClient(process.env.REDIS_PORT);


module.exports = function(req,res,next){
    //Get Cookie from Client
    const accessToken = req.cookies.access_token;
    console.log(accessToken);
    
    // Cookie is not Exist
    if(!accessToken){
        res.status(401);
        return res.redirect('/login')
        //return res.status(401).send('Access Denied');
    }
    
    // Check Redis Caches
    client.get(accessToken, function(err, data){
        if(err){
            console.error(err);
            res.status(500);
            return res.json({res_status: "internal server error"});
        }
        // Redis Cache is Exist
        if(data != null || data != undefined){
            return next();
        }
        // if Expired Access Token
        if(data == null || data == undefined){
            const result = models.users.findOne({
                where:{
                    idx: data
                }
            }).then(result => {
                // No Contents in DB
                if(result == null || result == undefined){
                    res.status(404);
                    return res.json({res_status: "invalid user"});
                }
                // Check Refresh Token
                const userIdx = result.dataValues.idx;
                const userId = result.dataValues.userId;
                const refreshToken = result.dataValues.refreshToken;
                
                jwt.verify(refreshToken,process.env.JWT_SECRET, function(err, decode){
                    if(err.name == 'TokenExpiredError'){
                        const newRefreshToken = jwt.sign({userIdx: userIdx}, process.env.JWT_SECRET);
                        const updateRefreshToken = models.users.update({refreshToken: newRefreshToken},{
                            where: {
                                idx: userIdx
                            }
                        })
                    }
                    else if(err){
                        console.error(err);
                        res.status(203);
                        return res.json({res_status: 'invalid refresh token'});
                    }
                    
                    // Generate Access Token & Set Cookie
                    const newAccessToken = jwt.sign({userIdx:userIdx, userId:userId}, process.env.JWT_SECRET, {expiresIn:'30m'});
                    client.setex(newAccessToken,1800, userIdx);
                    req.cookie('access_token', accessToken);
                    return next();
                });
            })
        }
    })
}
