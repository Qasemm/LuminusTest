
const {connectToMysql} = require('../config/mysql');

function getAllLocations(callback) {
    connectToMysql((error, connection) => {
        if (error) {
            callback(error, null);
            return;
        }

        const sql = "SELECT * from locations";
        connection.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }
            
            callback(null, result);
        });
    });
}

module.exports = {
    getAllLocations
};