require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');
const bcryptjs = require('bcryptjs');

const seedUsuario = async () => {
    try {
        // Conectar a BD
        await mongoose.connect(process.env.MONGOFB_CNN);
        console.log('Conectado a MongoDB');

        // Limpiar usuarios existentes
        await Usuario.deleteMany({});
        console.log('Usuarios eliminados');

        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync('password123', salt);

        // Crear usuario de prueba
        const usuarioData = {
            nombre: 'Admin Prueba',
            correo: 'admin@test.com',
            password: hashedPassword,
            rol: 'ADMIN_ROLE'
        };

        const usuarioInsertado = await Usuario.create(usuarioData);
        console.log('✓ Usuario insertado:', usuarioInsertado);

        // Verificar que se insertó
        const usuariosVerify = await Usuario.find();
        console.log('✓ Usuarios en BD:', usuariosVerify);

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seedUsuario();
