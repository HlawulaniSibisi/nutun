const mysql = require('mysql2');


// Function to retrieve all credentials from the database
async function loadCredentials(db) {
    const query = 'SELECT * FROM credentials'; // Query to get all records from the credentials table
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject('Error retrieving credentials from the database.');
            } else {
                if (results.length === 0) {
                    reject('No credentials found in the database.');
                } else {
                    resolve(results);  // Return all rows of credentials
                }
            }
        });
    });
}

// Export the function to be used in other files
module.exports = { loadCredentials };

