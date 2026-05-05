
const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: 'Error en los datos ingresados',
            errors: errors.array()
        });
    }

    next();
}





module.exports = {
    validarCampos
}