"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api"));
var app = (0, express_1.default)();
var port = 3000;
app.use("/api", api_1.default);
app.listen(port, function () {
    console.log("server is listening on http://localhost:".concat(port, "/api"));
});
exports.default = app;
