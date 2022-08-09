"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resizer_1 = __importDefault(require("../../../utilities/resizer"));
var resizeRoutes = express_1.default.Router();
resizeRoutes.get("/resize/:width/:height", resizer_1.default, function (req, res) {
    res.send("input width is ".concat(req.params.width, " and height is ").concat(req.params.height));
});
exports.default = resizeRoutes;
