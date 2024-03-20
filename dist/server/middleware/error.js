"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    console.log('! error middleware !');
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const stack = error.stack || '';
    if (process.env.NODE_ENV === 'production') {
        response.status(status).send();
        // response.status(status).json({
        //   status,
        //   message,
        //   stack,
        // });
    }
    else {
        response.status(status).json({
            status,
            message,
            stack,
        });
    }
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map