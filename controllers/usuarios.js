
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    try {
        const {limite = 5, desde = 0} = req.query;

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(),
            Usuario.find()
                .limit(Number(limite))
                .skip(Number(desde))
        ]);

        res.json({
            total,
            usuarios
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener datos de usuarioDB',
            error: error.message
        });
    }
}

const usuariosPost = async (req, res = response) => {
    try {
        const { nombre, correo, password, rol } = req.body;
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const usuario = new Usuario({ nombre, correo, password: hashedPassword, rol});
        await usuario.save();
        

        res.status(201).json({
            msg: 'post Api- controlador',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al guardar en usuarioDB',
            error: error.message
        });
    }
}


const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'put Api- controlador',
        usuario
    });
}


const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch Api- controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    // Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    // Borrar logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'delete Api- controlador',
        id,
        usuario
    });
}





module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};