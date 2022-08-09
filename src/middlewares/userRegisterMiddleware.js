const { body } = require("express-validator");

const validateForm = [
    body("first_name").notEmpty().withMessage("Debes completar el campo Nombre"),
    body("last_name").notEmpty().withMessage("Debes completar el campo Apellido"),
    body("email").isEmail().withMessage("Debes completar un Email válido"),
    body("username").notEmpty().withMessage("Debes completar el campo Nombre de Usuario"),
    body("password").notEmpty().withMessage("Debes completar el campo Contraseña"),
];

module.exports = validateForm;