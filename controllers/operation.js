const { handleExceptions } = require("../libs/utils");
const db = require('../libs/db');

const operationService = require('../services/operation');
const operationTypeEnum = require('../enums/operationType');
const recordService = require('../services/record');
const userService = require('../services/user');
const Joi = require("joi");

module.exports = {
    async registerOperation(req, res) {
        try {
            await db.startTransaction();
            const user = await userService.findByUsername(res.locals.loggedUsername);
            
            const type = req.body.type;
            const operation = await operationService.findByType(type);
            if (!operation) {
                throw "Operation type is invalid";
            }
            
            const operatorA = req.body.operatorA;
            const operatorB = type !== operationTypeEnum.SQUARE_ROOT ? req.body.operatorB : 0;
            const schema = Joi.object({
                type: Joi.string().required(),
                operatorA: Joi.number().required(),
                operatorB: Joi.number().required()
            });
            const { error } = schema.validate({ type, operatorA, operatorB });
            if (error) {
                throw error.details[0].message;
            }
            
            validateUserBalance(user, operation);
            validateOperators(operation.type, operatorA, operatorB);

            const newBalance = user.balance - operation.cost;
            const operationResult = await operationService.getOperationResult(operation.type, operatorA, operatorB);
            const recordData = {
                user_id: user.id,
                operation_id: operation.id,
                user_balance: newBalance,
                operation_response: operationResult
            };
            await recordService.insert(recordData);
            await userService.updateUserBalance(user.id, newBalance);

            await db.commit();
            res.status(200).json({ success: true, record: recordData });
        } catch (err) {
            await db.failTransaction();
            handleExceptions(err, res);
        }
    }
}

function validateUserBalance(user, operation) {
    if (operation.cost > user.balance) {
        throw "Not enough balance to make this operation";
    }
}

function validateOperators(type, operatorA, operatorB) {
    if (type === operationTypeEnum.SQUARE_ROOT && operatorA < 0) {
        throw "The value for Operator A can't be empty or negative";
    } else if (type === operationTypeEnum.DIVISION && operatorB === 0) {
        throw "The value for Operator B can't be 0";
    } else if (type === operationTypeEnum.RANDOM_STRING) {
        if (operatorA < 1 || operatorA > 10000) {
            throw "The value for Operator A must be between 1 and 10000";
        } else if (operatorB < 1 || operatorB > 20) {
            throw "The value for Operator B must be between 1 and 20"
        }
    }
}