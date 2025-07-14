"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No Autorizado');
        return res.status(401).json({ error: error.message });
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        const error = new Error('No Autorizado');
        return res.status(401).json({ error: error.message });
    }
    try {
        const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof result === 'object' && result.id) {
            const user = await User_1.default.findById(result.id).select('-password');
            if (!user) {
                const error = new Error('El Usuario no existe');
                return res.status(404).json({ error: error.message });
            }
            req.user = user;
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map