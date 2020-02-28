import parseJson from 'parse-json';
import {Tracks} from '../entities/Tracks';
import {Users} from '../entities/Users';

export const sumObjectToJSON = function(first: Tracks[] | Users[], second:Users[]): any{
  const trLength = first.length;
  const idLength = first.length;
  const header = {tracks_Length:trLength,users_Length:idLength};
  const headerJSON = JSON.stringify(header)+',';
  const user1JSON = JSON.stringify(first).split('[')[1].split(']')[0]+',';
  const user2JSON = JSON.stringify(second).split('[')[1].split(']')[0];
  const result = '['+headerJSON+user1JSON+user2JSON+']';
  const ret = parseJson(result);
  return ret;
}

export const sumLengthToJson = function(first: Tracks[] | Users[], second: Tracks[] | Users[]): any{
  const length = first.length;
  const header = {length:length};
  const headerJSON = JSON.stringify(header)+',';
  const objectJSON = JSON.stringify(second).split('[')[1].split(']')[0];
  const result = '['+headerJSON+objectJSON+']';
  const ret = parseJson(result);
  return ret;
}
