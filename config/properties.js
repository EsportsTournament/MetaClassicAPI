const reader = require('properties-reader')

const properties = reader('./config/app.properties');
const env = 'dev';
const dburl = properties.get(env + '.dbUrl');
const port = properties.get(env + '.port');

module.exports = { dburl: dburl, port: port };