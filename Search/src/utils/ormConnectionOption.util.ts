import {ConnectionOptions} from 'typeorm';

const connectionOptions : ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "dydtjs2",
    database: "yoyo",
    entities: [
        __dirname+"/../entities/*.ts"
    ],
    synchronize: true,
    logging: false
};

export {connectionOptions};