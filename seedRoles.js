require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/role');

const seedRoles = async () => {
    try {
        // Conectar a BD
        await mongoose.connect(process.env.MONGOFB_CNN);
        console.log('Conectado a MongoDB');

        // Limpiar roles existentes
        await Role.deleteMany({});
        console.log('Roles eliminados');

        // Insertar roles de prueba
        const rolesData = [
            { rol: 'ADMIN_ROLE' },
            { rol: 'USER_ROLE' }
        ];

        const rolesInsertados = await Role.insertMany(rolesData);
        console.log('✓ Roles insertados:', rolesInsertados);

        // Verificar que se insertaron
        const rolesVerify = await Role.find();
        console.log('✓ Roles en BD:', rolesVerify);

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seedRoles();
