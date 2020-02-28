"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("../controllers/upload.controller");
const router = express_1.Router();
const storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: multer_1.default.memoryStorage() });
router.post('/', upload.fields([{ name: 'music' }, { name: 'img' }]), upload_controller_1.uploadMusic);
exports.default = router;
