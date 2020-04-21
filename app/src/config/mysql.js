const mysql = require("mysql");

function connectToMysql(callback) {
    if (!callback) {
        return;
    }

    try {
        const connection = mysql.createConnection({
            host: process.env.DATABASE_HOST || '172.18.0.2',
            user: 'luminus',
            password: 'luminus',
            database: 'luminus',
            port: 3306
        });

        connection.connect(error => {
            if (error) {
                callback(error, null);
                return;
            }
    
            callback(null, connection);
        });
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    connectToMysql
};
