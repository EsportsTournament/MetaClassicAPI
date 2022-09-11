/*
* Module dependencies
*/

process.env.NODE_CONFIG_DIR = __dirname + '/config/';
// config = require('config');

import './db/db';
import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import { port } from './config/properties';
import userRouter from './router/user.router';
import tournamentRouter from './router/tournament.router';
import commonRouter from './router/common.router';
const UI_ROOT_URI = ["http://localhost:3000","https://www.metclan.xyz"]; 
const app = express();
import morgan from 'morgan';
import compression from 'compression';

app.use(compression())

app.use(cors(
    {
        // Sets Access-Control-Allow-Origin to the UI URI
        origin: UI_ROOT_URI,
        // Sets Access-Control-Allow-Credentials to true
        credentials: true,
      }
));
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

app.use(morgan('dev'));

app.use('/user', userRouter);
app.use("/tournament", tournamentRouter);
app.use("/common", commonRouter);

app.get('/', (req, res) => { res.json({ msg: 'Meta Classic Backend is up and live.' }) });

app.listen(process.env.PORT || port, () => {
    console.log('Express is serving at port: ', process.env.PORT || port);
});