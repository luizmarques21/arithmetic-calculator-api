const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const userMiddleware = require('../middlewares/user');
const userController = require('../controllers/user');
const operationController = require('../controllers/operation');
const recordController = require('../controllers/record');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true, parameterLimit: 20000 }));

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/login', userMiddleware.checkUserLogin, userController.login);

app.post('/operation', userMiddleware.handleAuth, operationController.registerOperation);

app.get('/records', userMiddleware.handleAuth, recordController.getRecords);

app.delete('/record/:id', userMiddleware.handleAuth, recordController.deleteRecord);

module.exports = app;
