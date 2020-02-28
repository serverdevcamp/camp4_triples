import express from 'express';
import {Application} from 'express';
import logger from 'morgan';
import * as path from 'path';
import 'reflect-metadata';
import SearchRoutes from './routes/search.routes';



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
        console.info(`Search Server on port ${this.app.get('port')}`);
    }

    private settings(){
        this.app.set('port', process.env.PORT || this.port || 3200);
    }

    private middleware(){
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname,'public')));
        this.app.use(logger('dev'));
    }

    private routes(){
        this.app.use('/search',SearchRoutes);

    }
}