"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    // generate error message
    const errorMessage = Object.entries(error.keyValue)
        .map(([key, value]) => `${key} '${value}' is already exist.`)
        .join('. ');
    // set status code
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorMessage,
        errorDetails: error,
    };
};
exports.default = handleDuplicateError;
