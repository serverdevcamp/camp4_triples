"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
function checkToken(req, res, next) {
    const accessToken = req.cookies.access_token;
    const client = redis_1.default.createClient(6379);
    if (client.get(accessToken)) {
        return next();
    }
}
