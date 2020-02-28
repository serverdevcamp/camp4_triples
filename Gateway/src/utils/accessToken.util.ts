import { client } from './redisClient.util';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../config/jwt';


export function generateAccessToken(idx: string | number, id: string, email: string): string{
  const user = {
    idx: idx,
    id: id,
    email: email
  }
  const accessToken = jwt.sign(user, jwtConfig.secret,{ expiresIn: '2h' });
  console.log(jwt.decode(accessToken));
  return accessToken;
}

export function regenerateAccessToken(accessToken: string): string | null {
  let newAccessToken: string;
  const decoded: any = jwt.decode(accessToken);
  const user = {
    idx: decoded.idx,
    email: decoded.email,
    id: decoded.userId
  };
  if (client.get(user.email)) {
    newAccessToken = jwt.sign(user, jwtConfig.secret, { expiresIn: '2h' });
    return newAccessToken;
  } else return null;
}
