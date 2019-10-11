"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
exports.searchVideos = (query) => {
    return index_1.models.Video.textSearch(query);
};
//# sourceMappingURL=handlers.js.map