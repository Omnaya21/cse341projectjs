const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const {auth, requiresAuth} = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const port = process.env.PORT || 8080;
const app = express();

//const swaggerUi = require('swagger-ui-express');
//const swaggerFile = require('./swagger-output.json');

app
  .use(auth(config))
  //.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)) 
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
})

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening on port ${port}`);
  }
});
