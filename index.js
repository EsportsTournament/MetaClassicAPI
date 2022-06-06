require('./db/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const properties = require('./config/properties');
const userRouter = require('./router/user.router');
const app = express();

app.listen(process.env.PORT || properties.port, () => {
    console.log('Express is serving at port: ', process.env.PORT || properties.port);
});

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', userRouter);

app.get('/', (req, res) => { res.json({ msg: 'Meta Classic Backend is up and live.' }) })
