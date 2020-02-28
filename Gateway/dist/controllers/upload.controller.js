"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormData = require("form-data");
const axios_1 = __importDefault(require("axios"));
function uploadMusic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        const formHeaders = formData.getHeaders();
        if (req.files || req.files.img != undefined) {
            formData.append('music', req.files.music[0].buffer, { filename: req.files.music[0].originalname });
            formData.append('img', req.files.img[0].buffer, { filename: req.files.img[0].originalname });
        }
        else {
            formData.append('music', req.file.buffer, { filename: 'music' });
        }
        try {
            const ret = yield new Promise(((resolve, reject) => {
                axios_1.default.post('http://localhost:7989/upload', formData, {
                    headers: Object.assign({}, formHeaders)
                })
                    .then(({ data }) => {
                    console.log(data);
                    resolve(data);
                })
                    .catch(({ data }) => reject(data));
            }));
            res.status(200);
            return res.json({ res_status: "uploaded" });
        }
        catch (e) {
            console.error(e);
            return res.status(400);
        }
    });
}
exports.uploadMusic = uploadMusic;
