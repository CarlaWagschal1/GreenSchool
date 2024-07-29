const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const {connectDB} = require('./database/db');
const authenticateJWT = require('./authMiddleware');

const manageToken = require('./database/queryManagers/authToken');
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

const upload = multer({ dest: 'uploads/' });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const handleRequest = async (request, response) => {
    console.log('Request received:', request.method, request.url);

    if(request.url.includes('/auth')){
        console.log("in auth")
        await manageToken(request, response);
    } else if(request.url.includes('/api')){
        console.log("in api")
        if((request.url.includes('/api/signin') || request.url.includes('/api/login'))&& request.method === 'POST'){
            await manageAPI(request, response);
        }
        else{
            console.log("in else")
            console.log(request.headers.authorization);
            //verify the token
            if(request.headers.authorization){
                console.log("in if")
                const token = request.headers.authorization.split(' ')[1];
                console.log('Token:', token);
                authenticateJWT(request, response, () => {
                    manageAPI(request, response);
                });
            }
            else {
                response.status(403).send('Forbidden');
            }
        }

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
