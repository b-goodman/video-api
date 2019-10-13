
import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleFileUpload
} from "./common";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleFileUpload];