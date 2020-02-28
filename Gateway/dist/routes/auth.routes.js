"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
const storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: multer_1.default.memoryStorage() });
router.post('/sign_in', auth_controller_1.signIn);
exports.default = router;
