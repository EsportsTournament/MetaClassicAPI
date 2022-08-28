/*
* Module dependencies
*/

process.env.NODE_CONFIG_DIR = __dirname + '/config/';
// config = require('config');

require('./db/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const properties = require('./config/properties');
const userRouter = require('./router/user.router');
const tournamentRouter = require('./router/tournament.router');
const commonRouter = require('./router/common.router');
const UI_ROOT_URI = ["http://localhost:3000","https://www.metclan.xyz"]; 
const app = express();
const morgan = require('morgan');

app.use(cors(
    {
        // Sets Access-Control-Allow-Origin to the UI URI
        origin: UI_ROOT_URI,
        // Sets Access-Control-Allow-Credentials to true
        credentials: true,
      }
));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'));

app.use('/user', userRouter);
app.use("/tournament", tournamentRouter);
app.use("/common", commonRouter);

app.get('/', (req, res) => { res.json({ msg: 'Meta Classic Backend is up and live.' }) });

app.listen(process.env.PORT || properties.port, () => {
    console.log('Express is serving at port: ', process.env.PORT || properties.port);
});