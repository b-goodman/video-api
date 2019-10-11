"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const video_1 = __importDefault(require("./video"));
exports.connectDb = () => {
    return mongoose_1.default.connect(process.env.DATABASE_URL);
};
exports.models = { Video: video_1.default };
//# sourceMappingURL=index.js.map