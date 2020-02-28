import { Request, Response } from 'express';

interface RequestWithFiles extends Request {
  files: any;
  token?: any;
}

export { RequestWithFiles };
