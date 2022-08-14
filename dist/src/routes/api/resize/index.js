"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resizer_1 = __importDefault(require("../../../utilities/resizer"));
var resizeRoutes = express_1.default.Router();
resizeRoutes.get('/', function (req, res) {
    res.send("<center><h4>Hello, Please go to /resize endpoint and enter imageName query string, width, and height,<br/> or only width or height for preserving the aspect ratio</h4></center>");
});
resizeRoutes.get("/resize", resizer_1.default, function () {
    //res.send(`input width is ${req.query.width} and height is ${req.query.height}`);
});
exports.default = resizeRoutes;
