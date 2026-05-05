
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol) => {
        const existRol = await Role.findOne({ rol: rol });
        if(!existRol){
            throw new Error(`El rol ${rol} no esta registrado en la DB`);
        }
   }

const emailExiste = async (correo) => {
    const existEmail = await Usuario.findOne({ correo });
    if(existEmail){
        throw new Error(`El correo ${correo} ya esta registrado en la DB`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existUsuario = await Usuario.findById(id);
    if(!existUsuario){
        throw new Error(`El id ${id} no existe en la DB`);
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}