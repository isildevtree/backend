"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: function (origin, callback) {
        // Lista blanca con el frontend definido en env
        const whiteList = [process.env.FRONTEND_URL];
        // Permitir llamadas sin 'origin' (como Postman) solo en desarrollo
        if (process.env.NODE_ENV !== 'production') {
            whiteList.push(undefined);
            whiteList.push('http://localhost:3000'); // si usas localhost frontend
        }
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    },
    credentials: true, // si usas cookies o autenticación con credenciales
};
//# sourceMappingURL=cors.js.map