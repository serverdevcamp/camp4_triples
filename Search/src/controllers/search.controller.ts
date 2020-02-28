import {Request, Response} from 'express';
import axios from 'axios';
import {getManager, Like} from 'typeorm';
import {Tracks} from '../entities/Tracks';
import {Users} from '../entities/Users';
import parseJson from 'parse-json';
import {sumObjectToJSON, sumLengthToJson} from '../utils/sumJSON.util';
import { Posts } from '../entities/Posts';
import { ResponseTracks, ResponseUsers, ResponseObj } from '../dto/Response.DTO';
import { genreConfig, typeConfig } from '../utils/enumConfig.util';


async function Test(req: Request, res: Response) {
  console.log(req.params.keyword);
  console.log(req.params.pages);
  const UsersRepository = await getManager().getRepository(Users);
  const savedUser1 = await UsersRepository.find({ userId: Like('%jys%') }); // tracks by title
  const savedUser2 = await UsersRepository.find({ email: Like('%jys%') }); // tracks by userid or nickname?

  const result = sumObjectToJSON(savedUser1, savedUser2);

  //console.log(parseJson(result));
  //const prettierParsing = parseJson(usersJSON);
  //console.log(prettierParsing);
  console.log(result);
  return res.json(result);
}

async function search(req: Request, res: Response): Promise<Response> {
  const keyword = req.params.keyword;

  if (keyword != null || keyword != undefined) {
    try {
      const tracksRepository = getManager().getRepository(Tracks);
      const usersRepository = getManager().getRepository(Users);
      const postsRepository = getManager().getRepository(Posts);
      
      let resTracks: ResponseTracks[] | any;
      let resUsers: ResponseUsers[] | any;
      let dto = new ResponseObj();
      // tracks 검색 결과
      let tracksResult = await tracksRepository.find({ title: Like(`%${keyword}%`) });
      let tracksLength = tracksResult.length;
      if (tracksLength === 0) resTracks = [];
      else {
        // 트랙 내림차순 정렬
        tracksResult = await tracksResult.sort(function(a: Tracks, b: Tracks): number {
          return b.playedCount - a.playedCount;
        });

        if (tracksLength > 5) {
          tracksResult = tracksResult.slice(0, 5);
          tracksLength = 5;
        }

        let ids: string[] = Array<string>();
        for (const id of tracksResult) {
          ids.push(id.usersIdx);
        }

        const tracksUserResults = await Promise.all(
          ids.map(idx => {
            return usersRepository.findOne(idx);
          })
        );

        const tracksPostResults = await Promise.all(
          ids.map(idx => {
            return postsRepository.findOne({ where: { usersIdx: idx } });
          })
        );

        resTracks = await((): ResponseTracks[] => {
          let ret = new Array<ResponseTracks>();
          for (let i = 0; i < tracksLength; i++) {
            const tmp = new ResponseTracks(tracksResult[i], tracksPostResults[i], tracksUserResults[i]);
            ret.push(tmp);
          }
          return ret;
        })();
      }

      let usersResult = await usersRepository.find({ userId: Like(`%${keyword}%`) });

      let usersLength = usersResult.length;
      if (usersLength === 0) resUsers = [];
      else {
        if (usersLength > 5) {
          usersResult = usersResult.slice(0, 5);
          usersLength = 5;
        }
        resUsers = await((): ResponseUsers[] => {
          let ret = new Array<ResponseUsers>();
          for (let i = 0; i < usersLength; i++) {
            const tmp = new ResponseUsers(usersResult[i]);
            ret.push(tmp);
          }
          return ret;
        })();
      }
      
      dto.access_token = '';
      dto.tracks = resTracks;
      dto.users = resUsers;
      const data = JSON.parse(JSON.stringify(dto));

      return res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500);
      return res.send();
    }
  } else {
    return res.send();
  }
}

async function searchTrack(req:Request ,res: Response): Promise<Response>{
  
  const keyword = req.params.keyword
  let pages: number = parseInt(req.params.pages);
  
  if(pages != null || pages != undefined){
    try{
      
      const tracksRepository = getManager().getRepository(Tracks);
      const usersRepository = getManager().getRepository(Users);
      const postsRepository = getManager().getRepository(Posts);
      let resTracks: ResponseTracks[] | any;
      let dto = new ResponseObj();
      let tracksResult = await tracksRepository.find({title: Like(`${keyword}`)});
      let tracksLength = tracksResult.length;
      if (tracksLength === 0) resTracks = [];
      else {
        tracksResult = await tracksResult.sort(function(a: Tracks, b: Tracks): number {
          return b.playedCount - a.playedCount; // ### not null CHECK ###
        });
        if (pages == 1 && tracksLength > 20) {
          tracksResult = await tracksResult.slice(0, 21);
        } else if (tracksLength > 20 && tracksLength > 20 * pages) {
          tracksResult = await tracksResult.slice((pages - 1) * 20, pages * 20 + 21);
          tracksLength = 20;
        } else {
          tracksResult = await tracksResult.slice((pages - 1) * 20, tracksResult.length);
          tracksLength = 20;
        }
        let ids: string[] = Array<string>();
        for(const id of tracksResult){
          ids.push(id.usersIdx);
        }
        const tracksUserResults = await Promise.all(
          ids.map(idx => {
            return usersRepository.findOne(idx);
          })
        );
        const tracksPostResults = await Promise.all(
          ids.map(idx => {
            return postsRepository.findOne({ where: { userIdx: idx} });
          })
        )

        resTracks = await ((): ResponseTracks[] => {
          let ret = new Array<ResponseTracks>();
          for(let i = 0; i < tracksLength; i++){
            const tmp = new ResponseTracks(tracksResult[i],tracksPostResults[i],tracksUserResults[i]);
            ret.push(tmp);
          }
          return ret;
        })();
      }
      
      dto.tracks = resTracks;
      
      const data = JSON.parse(JSON.stringify(dto));
      
      return res.json(data);

    }catch(err){
      console.error(err);
      res.status(500);
      return res.send();
    }
  }
  return res.send();
}


async function searchArtist(req:Request, res: Response): Promise<Response>{
const keyword = req.params.keyword
let pages: number = parseInt(req.params.pages);

  if(pages != null || pages != undefined){
    try{
      
      const usersRepository = await getManager().getRepository(Users);
      let resUsers: ResponseUsers[]| any;
      let dto = new ResponseObj();
      let usersResult = await usersRepository.find({userId: Like(`${keyword}`)});
      let usersLength = usersResult.length;

      usersResult = await usersResult.sort(function(a: Users, b: Users): number {
        return a.followerCount - b.followerCount; // ### not null CHECK ###
      });
      if (usersLength === 0) resUsers = [];
      else {
        if (pages == 1 && usersLength > 20) {
          usersResult = await usersResult.slice(0, 21);
        } else if (usersResult.length > 20 && usersResult.length > 20 * pages) {
          usersResult = await usersResult.slice((pages - 1) * 20, pages * 20 + 21);
          usersLength = 20;
        } else {
          usersResult = await usersResult.slice((pages - 1) * 20, usersResult.length);
          usersLength = 20;
        }
        resUsers = await((): ResponseUsers[] => {
          let ret = new Array<ResponseUsers>();
          for(let i = 0; i < usersLength; i++){
            const tmp = new ResponseUsers(usersResult[i]);
            ret.push(tmp);
          }
          return ret;
        })();
      }
      dto.users = resUsers;
      const data = JSON.parse(JSON.stringify(dto));
      
      return res.json(data);

    }catch(err){
      console.error(err);
      res.status(500);
      return res.send();
    }
  }
  return res.send();
}

export {Test, search, searchTrack, searchArtist}
 