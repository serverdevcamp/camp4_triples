import { Request, Response } from 'express';
import FormData = require('form-data');
import axios from 'axios';
import { RequestWithFiles } from '../interface/requestWithToken';

async function uploadMusic(req: RequestWithFiles, res: Response): Promise<Response> {
  
  const formData = new FormData();
  const formHeaders = formData.getHeaders();

  if (req.files || req.files.img != undefined) {
    formData.append('music', req.files.music[0].buffer, {
      filename: req.files.music[0].originalname
    });
    formData.append('img', req.files.img[0].buffer, {
      filename: req.files.img[0].originalname
    });
  } else {
    formData.append('music', req.file.buffer, { filename: 'music' });
  }

  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios
        .post('http://localhost:7989/upload', formData, {
          headers: {
            ...formHeaders
          }
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(({ data }) => reject(data));
    });

    res.status(200);
    return res.json({ res_status: 'uploaded' });

  } catch (e) {
    console.error(e);
    return res.status(400);
  }
}

async function uploadProfile(req: RequestWithFiles, res: Response): Promise<Response> {
  const formData = new FormData();
  const formHeaders = formData.getHeaders();

  formData.append('profile_img', req.files.profile_img[0].buffer, {
    filename: req.files.profile_img[0].originalname
  });

  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios
        .post('http://localhost:7989/profile', formData, {
          headers: {
            ...formHeaders
          }
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(({ data }) => {
          reject(data);
        });
    });

    res.status(200);
    return res.json({ res_status: 'uploaded' });

  } catch (e) {
    console.error(e);
    return res.status(400);
  }
}

async function uploadBg(req: RequestWithFiles, res: Response): Promise<Response> {
  const formData = new FormData();
  const formHeaders = formData.getHeaders();

  formData.append('profile_img', req.files.profile_img[0].buffer, {
    filename: req.files.profile_img[0].originalname
  });

  try {
    const ret: any = await new Promise((resolve, reject) => {
      axios
        .post('http://localhost:7989/profile/bg', formData, {
          headers: {
            ...formHeaders
          }
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(({ data }) => {
          reject(data);
        });
    });

    res.status(200);
    return res.json({ res_status: 'uploaded' });

  } catch (e) {
    console.error(e);
    return res.status(400).send();
  }
}
export { uploadMusic, uploadProfile, uploadBg };
