import { Request, Response, NextFunction } from 'express';
import { RequestWithFiles } from '../interface/requestWithToken';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import * as jwtConfig from '../config/jwt';
import { client } from '../utils/redisClient.util';
import { generateAccessToken, regenerateAccessToken } from '../utils/accessToken.util';

export async function authCheck(req: RequestWithFiles, res: Response, next: NextFunction): Promise<void | Response> {
  let accessToken = req.body.access_token;
  if (accessToken == null || accessToken == undefined) return res.status(203).send();
  try {
    jwt.verify(accessToken, jwtConfig.secret);
    next();
  } catch (err) {
    if (err.name == TokenExpiredError) {
      accessToken = await regenerateAccessToken(accessToken);
      if (accessToken != null) {
        req.token = accessToken;
        return next();
      }
      return res.status(203).send();
    } else return res.status(203).send();
  }
}
