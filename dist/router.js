"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const handlers_1 = require("./handlers");
const validation_1 = require("./middleware/validation");
const auth_1 = require("./middleware/auth");
const router = (0, express_1.Router)();
/** Autenticacion y Registro */
router.post('/auth/register', (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacio'), (0, express_validator_1.body)('name')
    .notEmpty()
    .withMessage('El Nombre no puede ir vacio'), (0, express_validator_1.body)('email')
    .isEmail()
    .withMessage('E-mail no válido'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('El Password es muy corto, mínimo 8 caracteres'), validation_1.handleInputErrors, handlers_1.createAccount);
router.post('/auth/login', (0, express_validator_1.body)('email')
    .isEmail()
    .withMessage('E-mail no válido'), (0, express_validator_1.body)('password')
    .notEmpty()
    .withMessage('El Password es obligatorio'), validation_1.handleInputErrors, handlers_1.login);
router.get('/user', auth_1.authenticate, handlers_1.getUser);
router.patch('/user', (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacio'), validation_1.handleInputErrors, auth_1.authenticate, handlers_1.updateProfile);
router.post('/user/image', auth_1.authenticate, handlers_1.uploadImage);
router.get('/:handle', handlers_1.getUserByHandle);
router.post('/search', (0, express_validator_1.body)('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacio'), validation_1.handleInputErrors, handlers_1.searchByHandle);
exports.default = router;
//# sourceMappingURL=router.js.map