"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFoundAPIHandler_1 = __importDefault(require("./app/middlewares/notFoundAPIHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
/** use for credentials: true */
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
/** use for credentials: false */
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
// welcome route
app.get('/', (req, res) => {
    res.send('Welcome to Stitch Server');
});
// global error handler
app.use(globalErrorHandler_1.default);
//Not Found API Route Handler
app.use(notFoundAPIHandler_1.default);
exports.default = app;
