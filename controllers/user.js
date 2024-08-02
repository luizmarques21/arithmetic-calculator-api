const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { handleExceptions } = require('../libs/utils');

module.exports = {
    async login(req, res) {
        try {
            const user = res.locals.user;
            const password = req.body.password;
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ user: user }, process.env.APP_AUTH_HASH, {});
                res.status(200).json({
                  success: true,
                  user,
                  token,
                });
            } else {
                throw "Invalid credentials";
            }
        } catch (err) {
            handleExceptions(err, res);
        }
    }
}
