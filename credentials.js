const mysql = require('mysql2');


async function loadCredentials(db) {
    const query = 'SELECT * FROM credentials'; 
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject('Error retrieving credentials from the database.');
            } else {
                if (results.length === 0) {
                    reject('No credentials found in the database.');
                } else {
                    resolve(results);
                }
            }
        });
    });
}

module.exports = { loadCredentials };

