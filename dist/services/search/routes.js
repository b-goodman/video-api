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
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../../middleware/checks");
const handlers_1 = require("./handlers");
exports.default = [
    {
        path: "/search",
        method: "get",
        handler: [
            checks_1.checkSearchParams,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const videos = yield handlers_1.searchVideos(req.query.q);
                res.send(videos);
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map