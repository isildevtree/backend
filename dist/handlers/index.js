"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByHandle = exports.getUserByHandle = exports.uploadImage = exports.updateProfile = exports.getUser = exports.login = exports.createAccount = void 0;
const express_validator_1 = require("express-validator");
const slug_1 = __importDefault(require("slug"));
const formidable_1 = __importDefault(require("formidable"));
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const jwt_1 = require("../utils/jwt");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createAccount = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        const error = new Error('Un usuario con ese mail ya esta registrado');
        return res.status(409).json({ error: error.message });
    }
    const handle = (0, slug_1.default)(req.body.handle, '');
    const handleExists = await User_1.default.findOne({ handle });
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible');
        return res.status(409).json({ error: error.message });
    }
    const user = new User_1.default(req.body);
    user.password = await (0, auth_1.hashPassword)(password);
    user.handle = handle;
    await user.save();
    res.status(201).send('Registro Creado Correctamente');
};
exports.createAccount = createAccount;
const login = async (req, res) => {
    // Manejar errores
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // Revisar si el usuario esta registrado
    const user = await User_1.default.findOne({ email });
    if (!user) {
        const error = new Error('El Usuario no existe');
        return res.status(404).json({ error: error.message });
    }
    // Comprobar el password
    const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Password Incorrecto');
        return res.status(401).json({ error: error.message });
    }
    const token = (0, jwt_1.generateJWT)({ id: user._id });
    res.send(token);
};
exports.login = login;
const getUser = async (req, res) => {
    res.json(req.user);
};
exports.getUser = getUser;
const updateProfile = async (req, res) => {
    try {
        const { description, links } = req.body;
        const handle = (0, slug_1.default)(req.body.handle, '');
        const handleExists = await User_1.default.findOne({ handle });
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Nombre de usuario no disponible');
            return res.status(409).json({ error: error.message });
        }
        // Actualizar el usuario
        req.user.description = description;
        req.user.handle = handle;
        req.user.links = links;
        await req.user.save();
        res.send('Perfil Actualizado Correctamente');
    }
    catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ error: error.message });
    }
};
exports.updateProfile = updateProfile;
const uploadImage = async (req, res) => {
    const form = (0, formidable_1.default)({ multiples: false });
    try {
        form.parse(req, (error, fields, files) => {
            cloudinary_1.default.uploader.upload(files.file[0].filepath, { public_id: (0, uuid_1.v4)() }, async function (error, result) {
                if (error) {
                    const error = new Error('Hubo un error al subir la imagen');
                    return res.status(500).json({ error: error.message });
                }
                if (result) {
                    req.user.image = result.secure_url;
                    await req.user.save();
                    res.json({ image: result.secure_url });
                }
            });
        });
    }
    catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ error: error.message });
    }
};
exports.uploadImage = uploadImage;
const getUserByHandle = async (req, res) => {
    try {
        const { handle } = req.params;
        const user = await User_1.default.findOne({ handle }).select('-_id -__v -email -password');
        if (!user) {
            const error = new Error('El Usuario no existe');
            return res.status(404).json({ error: error.message });
        }
        res.json(user);
    }
    catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ error: error.message });
    }
};
exports.getUserByHandle = getUserByHandle;
const searchByHandle = async (req, res) => {
    try {
        const { handle } = req.body;
        const userExists = await User_1.default.findOne({ handle });
        if (userExists) {
            const error = new Error(`${handle} ya está registrado`);
            return res.status(409).json({ error: error.message });
        }
        res.send(`${handle} está disponible`);
    }
    catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ error: error.message });
    }
};
exports.searchByHandle = searchByHandle;
//# sourceMappingURL=index.js.map