const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB} = require('./database/db');

const manageAPI = require('./database/queryManagers/api');


dotenv.config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());


const handleRequest = async (request, response) => {
    console.log('Request received:', request.method, request.url);

    if(request.url.includes('/api')){
        await manageAPI(request, response);
    }
    else{
        response.status(404).send('Not found');
    }

}

app.use(handleRequest);


connectDB((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }

    app.listen(5000, () => {
        console.log('Server listening on port 5000');
    });
});
