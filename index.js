// Import Express.js
const express = require("express");
require('dotenv').config();

//Database Connection
require('./dbConnection.js')

// Import body-parser (to handle parameters more easily)
const bodyParser =require('body-parser')

// This variable defines the port of your computer where the API will be available
var PORT = process.env.PORT || 8080;

// This variable instantiate the Express.js library
const app = express()
// Indicate to Express.js that you're using an additional plugin to treat parameters
app.use(bodyParser.json())
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
console.log(`The Books API is running on: http://localhost.${PORT}`)
)
app.use(require('./routes'));

// The code below creates a GET route with these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to execute
app.get('/', (request, response) => {
  // The string we want to display on http://localhost:3000
  response.send('Welcome on the books API! Take a breath and start using it!')
})

