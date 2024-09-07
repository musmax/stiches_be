"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle cast errors
const handleCastError = (error) => {
    // generate error message
    const errorMessage = `${error.value} is not a valid ID!`;
    // set status code
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessage,
        errorDetails: error,
    };
};
exports.default = handleCastError;
