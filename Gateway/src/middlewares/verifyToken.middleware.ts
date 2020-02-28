import jwt from 'jsonwebtoken';
import redis from 'redis';
import { NextFunction, Response } from 'express';
import { RequestWithFiles } from '../interface/requestWithToken';

function checkToken(req: RequestWithFiles, res: Response, next: NextFunction) {
  const accessToken = req.token;
  const client = redis.createClient();
  if (client.get(accessToken)) {
    return next();
  }
}

export { checkToken };
