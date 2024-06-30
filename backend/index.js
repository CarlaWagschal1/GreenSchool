const express = require('express');
const app = express();

const db = require('./db');

db().then(database => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error(err);
});




