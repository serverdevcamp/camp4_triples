import { client } from './redisClient.util';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../config/jwt';

export function checkRefreshToken(email:string): boolean {
  client.get(email, (err, reply) => {
    if(reply != null)
      return true
    return false;
  })
  return false
}

export function generateRefreshToken(email: string): string{
  const RefreshToken = jwt.sign(email, jwtConfig.secret);
  console.log(RefreshToken);
  client.setex(email,60*60*24*7,RefreshToken);
  return RefreshToken;
}
