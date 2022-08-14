"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var oldfs = __importStar(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var baseDir = "assets/uploads/images";
function Resizer(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var imageName, width, height;
        return __generator(this, function (_a) {
            // check if imageName exists
            if (!req.query.imageName) {
                res.send("<h3 style='color:red'>Please enter image name</h3>");
                return [2 /*return*/];
            }
            //check if image folder exists
            if (!oldfs.existsSync("".concat(baseDir, "/").concat(req.query.imageName))) {
                res.send("<h3 style='color:orange'>entered imageName doesn't exist in the included images, please stick with Cat, Dog, and Deer</h3>");
                console.log("".concat(baseDir, "/").concat(req.query.imageName));
                return [2 /*return*/];
            }
            // check if width and/or height are present
            if (!req.query.width && !req.query.height) {
                res.send("<h3 style='color:orange'>Please enter a width and/or height</h3>");
                return [2 /*return*/];
            }
            imageName = req.query.imageName;
            width = Number(req.query.width);
            height = Number(req.query.height);
            if (req.query.width && req.query.height && !HasCache(imageName || undefined, res, width, height)) {
                //res.send("<h3 style='color:orange'>Please enter a width and/or height</h3>");
                //res.send("<h3 style='color:blue'>both width and height are present</h3>");
                GenerateImage(imageName || undefined, res, width, height);
            }
            else if (!isNaN(+req.query.width) &&
                isNaN(+req.query.height) &&
                !HasCache(imageName || undefined, res, width)) {
                GenerateImage(imageName || undefined, res, width);
            }
            else if (!isNaN(+req.query.height) &&
                isNaN(+req.query.width) &&
                !HasCache(imageName || undefined, res, width, height)) {
                GenerateImage(imageName || undefined, res, width, height);
            }
            // try {
            //   const originalImage: Buffer = await fs.readFile(
            //     `${baseDir}/${imageName}/${imageName}.jpg`
            //   );
            //   sharp(originalImage)
            //     .resize(width)
            //     .toFile(`newImage_${width}.jpg`, (err, info) => {
            //       console.error(err);
            //       console.log(info);
            //       const dir = path.join(__dirname, `../../../newImage_${width}.jpg`);
            //       res.sendFile(dir);
            //     });
            // } catch (err) {
            //   console.error(err);
            // }
            next();
            return [2 /*return*/];
        });
    });
}
exports.default = Resizer;
// check if image already exists, so send chached image
function HasCache(fileName, res, width, height, bDir) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (bDir === void 0) { bDir = baseDir; }
    //if(fileName === undefined) return;
    var dir = "".concat(bDir, "/").concat(fileName, "/").concat(fileName);
    var absoluteFilePath;
    if (height && width && oldfs.existsSync("".concat(dir, "_").concat(width, "x").concat(height, ".jpg"))) {
        console.log("File exists: " + dir);
        absoluteFilePath = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_").concat(width, "x").concat(height, ".jpg"));
        res.sendFile(absoluteFilePath);
        return true;
    }
    else if (width && !height && oldfs.existsSync("".concat(dir, "_w_").concat(width, ".jpg"))) {
        console.log("File exists, serve the cached image");
        absoluteFilePath = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_w_").concat(width, ".jpg"));
        res.sendFile(absoluteFilePath);
        return true;
    }
    else if (height && !width && oldfs.existsSync("".concat(dir, "_h_").concat(height, ".jpg"))) {
        //console.log("File exists, serve the cached image");
        absoluteFilePath = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_h_").concat(height, ".jpg"));
        res.sendFile(absoluteFilePath);
        return true;
    }
    return false;
}
function GenerateImage(fileName, res, width, height, bDir) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (bDir === void 0) { bDir = baseDir; }
    return __awaiter(this, void 0, void 0, function () {
        var originalImage, err_1, originalImage, err_2, originalImage, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Generating image...");
                    if (!(height && width)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.readFile("".concat(bDir, "/").concat(fileName, "/").concat(fileName, ".jpg"))];
                case 2:
                    originalImage = _a.sent();
                    (0, sharp_1.default)(originalImage)
                        .resize(width, height)
                        .toFile("assets/uploads/images/".concat(fileName, "/").concat(fileName, "_").concat(width, "x").concat(height, ".jpg"), function (err, info) {
                        console.error(err);
                        console.log(info);
                        var dir = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_").concat(width, "x").concat(height, ".jpg"));
                        res.sendFile(dir);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 14];
                case 5:
                    if (!width) return [3 /*break*/, 10];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, fs_1.promises.readFile("".concat(bDir, "/").concat(fileName, "/").concat(fileName, ".jpg"))];
                case 7:
                    originalImage = _a.sent();
                    (0, sharp_1.default)(originalImage)
                        .resize(width)
                        .toFile("assets/uploads/images/".concat(fileName, "/").concat(fileName, "_w_").concat(width, ".jpg"), function (err, info) {
                        console.error(err);
                        console.log(info);
                        var dir = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_w_").concat(width, ".jpg"));
                        res.sendFile(dir);
                    });
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 14];
                case 10:
                    if (!height) return [3 /*break*/, 14];
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, fs_1.promises.readFile("".concat(bDir, "/").concat(fileName, "/").concat(fileName, ".jpg"))];
                case 12:
                    originalImage = _a.sent();
                    (0, sharp_1.default)(originalImage)
                        .resize(height)
                        .toFile("assets/uploads/images/".concat(fileName, "/").concat(fileName, "_h_").concat(height, ".jpg"), function (err, info) {
                        console.error(err);
                        console.log(info);
                        var dir = path_1.default.join(__dirname, "../../../assets/uploads/images/".concat(fileName, "/").concat(fileName, "_h_").concat(height, ".jpg"));
                        res.sendFile(dir);
                    });
                    return [3 /*break*/, 14];
                case 13:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
