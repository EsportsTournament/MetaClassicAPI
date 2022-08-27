const properties = require('../config/properties');
const mongoose = require('mongoose');
mongoose.connect(properties.dburl,  { useUnifiedTopology: true }).then(
    () => { console.log('connected to db'); }
).catch(
    (err) => { console.log('err connecting to db:',err); }
);

require('./../model/user.model');
require('./../model/tournament.model');
