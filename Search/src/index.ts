import {App} from './app';
import "reflect-metadata";
import {createConnection, Like} from "typeorm";
import { Users } from './entities/Users';
import {connectionOptions} from './utils/ormConnectionOption.util';
import parseJson = require('parse-json');



createConnection(connectionOptions).then(async connection => {
  const ids = ['8','9'];
  const UsersRepository = await connection.getRepository(Users);
  const ret = await Promise.all(ids.map(
    idx => {
      return UsersRepository.findOne(idx);
  })
  );
  console.log(ret);                                                              
}).catch(error => console.log(error));


(async function main(){
  const app = new App();
  await app.listen();


})();