const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('||DB||ON||');
    } catch (error) {
        console.log(error);
        throw new Error('||ERROR||DATABASE||')
    }
}

module.exports = dbConnection;
