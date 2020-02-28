import express from 'express';
import bodyParser from 'body-parser';
import {Application} from 'express';
import logger from 'morgan';
import cors from 'cors';
import pug from 'pug'

import * as path from 'path';

import multer from 'multer';

import UploadRoutes from './routes/upload.routes';
import SearchRoutes from './routes/search.routes';
import MembershipRoutes from './routes/membership.routes'

export class App{
    private app: Application;

    constructor(private port? : number | string){
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    public async listen(){
        await this.app.listen(this.app.get('port'));
        console.info(`API Gateway on port ${this.app.get('port')}`);
    }

    private settings(){
        this.app.set('port', process.env.PORT || this.port || 3100);
    }

    private middleware(){
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(express.static(path.join(__dirname,'public')));
        this.app.use(cors());
        this.app.use(logger('dev'));
    }

    private routes(){
        this.app.use('/api/upload', UploadRoutes);
        this.app.use('/api/search', SearchRoutes);
        this.app.use('/api/membership',MembershipRoutes);
    }
}