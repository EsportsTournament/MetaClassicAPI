const properties = require('../config/properties');
const mongoose = require('mongoose');
mongoose.connect(properties.dburl).then(
    () => { console.log('connected to db'); }
).catch(
    (err) => { console.log(err); }
);

require('./../model/user.model');
require('./../model/tournament.model');
