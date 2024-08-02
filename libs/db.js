const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = {
    connect: () => {
        conn.connect((err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Connected to MySQL database.');
        });
    },
    query: (sql, params) => {
        return new Promise((resolve, reject) => {
            conn.query(sql, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    startTransaction: () => {
        return new Promise((resolve, reject) => {
            conn.beginTransaction((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },
    commit: () => {
        return new Promise((resolve, reject) => {
            conn.commit((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },
    failTransaction: () => {
        return new Promise((resolve, reject) => {
            conn.rollback((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },
}