const {connectToMysql} = require('../config/mysql');

function insertDragon(dragon, callback) {
    if (!callback) {
        return;
    }

    const {name, age, foods, location} = dragon;

    connectToMysql((error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        const sql = `
            INSERT INTO
                dragons (name, age, foods, location_id)
                VALUES ("${name}", ${age}, "${foods}", ${location})
        `;
        connection.query(sql, (error, result) => {
            if (error) {
                callback(error);
                return;
            }

            callback(null);
        });
    });
}

function updateDragon(id, dragon, callback) {
    if (!callback) {
        return;
    }

    const {name, age, foods, location} = dragon;

    connectToMysql((error, connection) => {
        if (error) {
            callback(error);
            return;
        }

        const sql = `
            UPDATE
                dragons
            SET
                name="${name}",
                age=${age},
                foods="${foods}",
                location_id=${location}
            WHERE
                id = ${id}
        `;
        connection.query(sql, (error, result) => {
            if (error) {
                callback(error);
                return;
            }

            callback(null);
        });
    });
}

function getAllDragons(callback) {
    connectToMysql((error, connection) => {
        if (error) {
            callback(error, null);
            return;
        }

        const sql = `SELECT
                        dragons.id,
                        dragons.name,
                        dragons.age,
                        dragons.foods,
                        locations.name AS location
                    FROM dragons
                    INNER JOIN locations on (dragons.location_id = locations.id)`;

        connection.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }
            
            callback(null, result);
        });
    });
}

function getDragon(id, callback) {
    connectToMysql((error, connection) => {
        if (error) {
            callback(error, null);
            return;
        }

        const sql = `SELECT
                        dragons.id,
                        dragons.name,
                        dragons.age,
                        dragons.foods,
                        locations.name AS location,
                        locations.id AS location_id
                    FROM dragons
                    INNER JOIN locations on (
                        dragons.location_id = locations.id
                    ) WHERE dragons.id = ${id}`;

        connection.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }
            
            callback(null, result[0] || null);
        });
    });
}

module.exports = {
    insertDragon,
    updateDragon,
    getAllDragons,
    getDragon,
};
