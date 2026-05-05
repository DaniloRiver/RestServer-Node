const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOFB_CNN);
        console.log('Database online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing database');
    }
};

module.exports = {
    dbConnection,
};   

