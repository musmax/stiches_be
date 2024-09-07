"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// define handle zod error function
const handleZodError = (error) => {
    // generate error message
    const errorMessage = error.issues
        .map(issue => `${issue.path[issue.path.length - 1]} is ${issue.message}.`)
        .join('. ');
    // set status code
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage,
        errorDetails: error,
    };
};
exports.default = handleZodError;
