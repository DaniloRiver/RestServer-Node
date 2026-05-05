
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.middlewares();
        this.routes();
    }

   // Conectar a base de datos
    async conectarDB(){
        await dbConnection();
    }

    async start(){
        await this.conectarDB();
        this.listen();
    }

  // Middlewares
  // Rutas de aplicacion
    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'));
        this.app.use(cors())

        //Parseo y lectura del body
        this.app.use(express.json());
    }



    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }


    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }



}


module.exports = Server;