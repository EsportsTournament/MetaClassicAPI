const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adrian:pF2YGsSrZHmkXV1L@cluster0.d0w5eyj.mongodb.net/metadb?retryWrites=true&w=majority').then(
    () => { console.log('connected to db'); }
).catch(
    (err) => { console.log(err); }
);

require('./../model/user.model');
require('./../model/tournament.model');
