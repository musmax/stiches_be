"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import config from "../config";
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
// define simplified error function
const simplifiedError = (err) => {
    // set default error properties
    const statusCode = 400;
    const message = 'Something went wrong';
    const errorMessage = 'Something went wrong or missing or invalid';
    const errorDetails = err;
    // handle zod validation error
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        return (0, handleZodError_1.default)(err);
    }
    // handle duplicate error
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        return (0, handleDuplicateError_1.default)(err);
    }
    // handle cast error
    if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        return (0, handleCastError_1.default)(err);
    }
    // handle mongoose validation error
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        return (0, handleValidationError_1.default)(err);
    }
    // handle json web token error
    if ((err === null || err === void 0 ? void 0 : err.statusCode) === 401 || (err === null || err === void 0 ? void 0 : err.statusCode) === 403) {
        return {
            success: false,
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: 'Unauthorized Access',
            errorMessage: err.message ? err.message :
                'You do not have the necessary permissions to access this resource.',
            errorDetails: null,
            stack: null,
        };
    }
    // handle AppError
    if (err instanceof AppError_1.default) {
        return {
            statusCode: err.statusCode,
            message,
            errorMessage: err.message,
            errorDetails,
        };
    }
    // handle other errors
    if (err instanceof Error) {
        return {
            statusCode,
            message,
            errorMessage: err.message,
            errorDetails,
        };
    }
    return { statusCode, message, errorMessage, errorDetails };
};
// define a global error handler middleware
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // simplified error
    const { statusCode, message, errorMessage, errorDetails } = simplifiedError(err);
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: config_1.default.NODE_ENV === 'production' ? null : err === null || err === void 0 ? void 0 : err.stack,
        // stack: err?.stack,
    });
});
exports.default = globalErrorHandler;
