require('./db/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const properties = require('./config/properties');
const userRouter = require('./router/user.router');
const app = express();

const PORT = 8890
app.listen(PORT, () => {
    console.log('Express is serving at port: ', PORT);
});

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', userRouter);

app.get('/', (req, res) => { res.json({ msg: 'Meta Classic Backend is up and live.' }) })
