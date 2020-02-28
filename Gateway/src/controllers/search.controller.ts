import { Request, Response } from 'express';
import axios from 'axios';
import { searchServer } from '../config/serverConfig';
import { RequestWithFiles } from '../interface/requestWithToken';
import { axiosConfig } from '../utils/axiosConfig.util';

async function search(req: Request, res: Response): Promise<Response> {
  try {
    const keyword = req.params.keyword;
    const ret: any = await new Promise((resolve, reject) => {
      axios(axiosConfig('post', req, `${searchServer}/search/${keyword}`))
        .then(result => {
          resolve(result.data);
        })
        .catch(result => {
          reject(result);
        });
    });
    res.status(200);
    //console.log(ret);
    return res.json(ret);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

async function searchTrack(req: Request, res: Response): Promise<Response> {
  try {
    const keyword = req.params.keyword;
    const pages = req.params.pages;
    const ret: any = await new Promise((resolve, reject) => {
      axios(
        axiosConfig(
          'post',
          req,
          `${searchServer}/search/title/${keyword}/${pages}`
        )
      )
        .then(result => {
          resolve(result.data);
        })
        .catch(result => {
          reject(result);
        });
    });
    return res.json(ret);
  } catch (e) {
    console.error(e);
    return res.send(500);
  }
}

async function searchArtist(req: Request, res: Response): Promise<Response> {
  try {
    const keyword = req.params.keyword;
    const pages = req.params.pages;
    const ret: any = await new Promise((resolve, reject) => {
      axios(
        axiosConfig(
          'post',
          req,
          `${searchServer}/search/artist/${keyword}/${pages}`
        )
      )
        .then(result => {
          resolve(result.data);
        })
        .catch(result => {
          reject(result);
        });
    });
    return res.json(ret);
  } catch (e) {
    console.error(e);
    return res.send(500);
  }
}

export { search, searchTrack, searchArtist };
