const db = require('../libs/db');

module.exports = {
    async findByUsername(email) {
        try {
            let user;
            const sql = 'SELECT * FROM user WHERE username = ?';
            await db.query(sql, [email]).then((res) => {
                user = res[0];
            });

            return user;
        } catch (error) {
            console.log('Error finding user: ', error);
            throw error;
        }
    },
    async updateUserBalance(id, newBalance) {
        try {
            const sql = 'UPDATE user SET balance = ? WHERE id = ?';
            await db.query(sql, [newBalance, id]);
        } catch (error) {
            console.log('Error updating user balance: ', error);
            throw error;
        }
    }
}