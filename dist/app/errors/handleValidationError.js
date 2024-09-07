"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle mongoose validation error
const handleValidationError = (error) => {
    // generate error message
    const errorMessage = Object.values(error.errors)
        .map(value => value.message)
        .join(' ');
    // set status code
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage,
        errorDetails: error,
    };
};
exports.default = handleValidationError;
