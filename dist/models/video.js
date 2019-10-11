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
const mongoose_1 = require("mongoose");
;
const videoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    tags: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
});
videoSchema.index({
    title: 'text',
    tags: 'text',
    description: 'text'
}, {
    weights: {
        title: 10,
        tags: 5,
    },
    name: 'video_search_index'
});
videoSchema.statics.textSearch = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.find({ $text: { $search: query } });
    });
};
exports.default = mongoose_1.model('Video', videoSchema);
//# sourceMappingURL=video.js.map