import { Request, Response } from 'express';
import axios from 'axios';
import { membershipServer } from '../config/serverConfig';
import { axiosConfig } from '../utils/axiosConfig.util';
import { checkRefreshToken, generateRefreshToken } from '../utils/refreshToken.util';
import { generateAccessToken } from '../utils/accessToken.util';

//

/*
 로그인, 회원가입 요청시에는 토큰 검사를 진행하지 않음.
 
* */

async function signIn(req: Request, res: Response): Promise<Response> {
  try {
    let accessToken;
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${membershipServer}/sign_in`))
        .then(result => {
          resolve(result);
        })
        .catch(result => {
          reject(result);
        });
    });
    if (ret.status == 200) {
      if (!checkRefreshToken(ret.data.email)) {
        await generateRefreshToken(ret.data.email);
      }
      accessToken = await generateAccessToken(ret.data.idx, ret.data.user_id, ret.data.email);
      res.status(200);

      return res.json({ access_token: accessToken });
    }
    return res.send(ret.data);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
}

async function signUp(req: Request, res: Response): Promise<Response> {
  try {
    let accessToken;
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${membershipServer}/sign_up`))
        .then(result => {
          resolve(result);
        })
        .catch(result => {
          reject(result);
        });
    });
    if (ret.status == 200) {
      if (!checkRefreshToken) {
        await generateRefreshToken(ret.data.email);
      }
      accessToken = await generateAccessToken(ret.data.idx, ret.data.string, ret.data.email);
      res.status(200);

      return res.json({ access_token: accessToken });
    }
    if (ret.status == 500) {
      return res.status(500).send();
    }
    return res.json(ret.data);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
}

async function signOut(req: Request, res: Response): Promise<Response> {
  const accessToken = req.body.access_token;
  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${membershipServer}/sign_out`))
        .then(result => {
          resolve(result);
        })
        .catch(result => {
          reject(result);
        });
    });
    res.status(200);
    return res.json({ access_token: accessToken });
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

async function sendEmail(req: Request, res:Response): Promise<Response>{
  const accessToken = req.body.access_token;
  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${membershipServer}/verify_email/send`))
      .then(result => {
        resolve(result);
      })
      .catch(result => {
        reject(result);
      });
      
    });
    res.status(200);
    return res.json({ access_token: accessToken });
  }
  catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

async function verifyEmail(req: Request, res:Response): Promise<Response>{
  const accessToken = req.body.access_token;
  const code = req.params.code;
  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${membershipServer}/verify_email/verify/${code}`))
      .then(result => {
        resolve(result);
      })
      .catch(result => {
        reject(result);
      });
      
    });
    res.status(200);
    return res.json({ access_token: accessToken });
  }
  catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

export { signIn, signUp, signOut, sendEmail, verifyEmail };
