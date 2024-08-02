require('dotenv').config();
require('./libs/db').connect();

const app = require('./routes');
const port = process.env.PORT || 3035;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
