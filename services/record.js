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
    },
    async findByUsername(username, page = undefined, limit = process.env.RECORD_LIMIT) {
        try {
            let records = [];
            let sql = `SELECT r.id, o.type, u.username, user_balance, operation_response, date FROM record r 
                        LEFT JOIN user u ON r.user_id = u.id 
                        LEFT JOIN operation o ON r.operation_id = o.id
                        WHERE deleted = ? AND username = ?`
            ;
            if (page) {
                const index = page > 1 ? (page - 1) * limit : page;
                sql += ` LIMIT ${index},${limit}`;
            }
            
            await db.query(sql, [false, username]).then((res) => {
                records = res;
            });

            return records;
        } catch (error) {
            console.log('Error finding records: ', error);
            throw error;
        }
    },
    async delete(id) {
        try {
            const sql = `UPDATE record SET deleted = ? WHERE id = ?`;
            await db.query(sql, [true, id]);
        } catch (error) {
            console.log('Error deleting record: ', error);
            throw error;
        }
    }
}