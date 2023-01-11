const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        // console.log('ini config')
        mongoose.connect(process.env.DB_CNN);

        console.log('DB Online Internet');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}