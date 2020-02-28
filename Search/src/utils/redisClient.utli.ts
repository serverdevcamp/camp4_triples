import * as redis from 'redis';

export const client = redis.createClient(6379); // 수정 필요 config 
