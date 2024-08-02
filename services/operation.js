const axios = require('axios');
const db = require('../libs/db');
const operationTypeEnum = require('../enums/operationType');

module.exports = {
    async findByType(type) {
        try {
            let operation;
            const sql = 'SELECT * FROM operation WHERE type = ?';
            await db.query(sql, [type]).then((res) => {
                operation = res[0];
            });

            return operation;
        } catch (error) {
            console.log('Error finding operation: ', error);
            throw error;
        }
    },
    async getOperationResult(type, operatorA, operatorB) {
        switch (type) {
            case operationTypeEnum.ADDITION:
                return operatorA + operatorB;
            case operationTypeEnum.SUBTRACTION:
                return operatorA - operatorB;
            case operationTypeEnum.MULTIPLICATION:
                return operatorA * operatorB;
            case operationTypeEnum.DIVISION:
                return operatorA / operatorB;
            case operationTypeEnum.SQUARE_ROOT:
                return Math.sqrt(operatorA);
            case operationTypeEnum.RANDOM_STRING:
                return await getRandomString(operatorA, operatorB);
        }
    }
}

async function getRandomString(operatorA, operatorB) {
    const url = process.env.RANDOM_STRING_API
        .replace(process.env.RANDOM_STRING_NUM, operatorA)
        .replace(process.env.RANDOM_STRING_LEN, operatorB);
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('Error generating random strings: ', error);
        throw error;
    }
}