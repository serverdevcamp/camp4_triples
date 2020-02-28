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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path = __importStar(require("path"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middleware();
        this.routes();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.info(`API Gateway on port ${this.app.get('port')}`);
        });
    }
    settings() {
        this.app.set('port', process.env.PORT || this.port || 3100);
    }
    middleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path.join(__dirname, 'public')));
        this.app.use(morgan_1.default('dev'));
    }
    routes() {
        this.app.use('/api/upload', upload_routes_1.default);
        this.app.use('/api/auth', auth_routes_1.default);
    }
}
exports.App = App;
