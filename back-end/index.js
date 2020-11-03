require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const properties = require('./properties/properties')
const port = properties.PORT
const app = express()
const requestIp = require('request-ip');
const router = express.Router()
const routes = require('./routes/router')
const {logger, middleware, errorHandler} = require('./controllers/err.handler')
const {exceptionHandler} = require('./controllers/csrf.handler')
const {jwt} = require('./controllers/jwt.controller')
const {configure} = require('./controllers/configure')
const path = require('path')
const corsOptions = { origin: '*' }
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '10mb',  type: 'application/json' }));
app.use(requestIp.mw());
configure((call)=>{app.use(jwt())});
app.use(logger);
app.use(express.static(path.join(__dirname, '/dist')));

//app.use(middleware);
app.use(cookieParser());
app.use(exceptionHandler);
app.use('/api', router);
routes(router);

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist/index.html'))})

app.use(errorHandler);
    
app.listen(port, function () {
    console.log( properties.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString()) ;
}); 
