const db = require('../libs/db');

module.exports = {
    async insert(data) {
        try {
            const sql = 'INSERT INTO record (operation_id, user_id, user_balance, operation_response, date) VALUES (?, ?, ?, ?, ?)';
            const params = [
                data.operation_id,
                data.user_id,
                data.user_balance,
                data.operation_response,
                new Date()
            ];
            await db.query(sql, params);
        } catch (error) {
            console.log('Error finding user: ', error);
            throw error;
        }
    }
}