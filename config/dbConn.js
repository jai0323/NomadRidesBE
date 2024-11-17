const mysql = require('mysql2');

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        // host: process.env.DB_HOST,
        // user: process.env.DB_USER,
        // password: process.env.DB_PASS,
        // database: process.env.DB_NAME,
        // port: process.env.DB_PORT,

        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nomadrides'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
        } else {
            console.log('Connection Established');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect if the connection is lost
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
