/*
*Created by Shivam on 14/June/2022
*/

config = require('config');

const redis_config = {
    host: config.get('redisSettings.host'),
    port: config.get('redisSettings.port')
};

const redis = require('redis').createClient(redis_config.port, redis_config.host);

(async () => {
    await redis.connect();
})();

redis.on('connect', (error) => {
    redis.connected = true;
    console.log('Local Redis Connected.');
});

redis.on('error', (error) => {
    redis.connected = false;
    console.log('Error in redis connection.')
    throw error;
});

const redisClient = {
    insert: async (handlerInfo, key, value, expirationTime) => {
        const result = await redis.set(key, value, expirationTime);
        logging.trace(handlerInfo, { INSERTED: result }, { KEY: key });
        result = await redis.expire(key, expirationTime);
        logging.trace(handlerInfo, { EXPIRATION: result }, { EXP_TIME: expirationTime });
    },
    get: async (handlerInfo, key) => {
        return await redis.get(key);
    },
    updateExpirationTime: async (handlerInfo, key, value, expirationTime) => {
        await redisClient.delete(handlerInfo, key);
        await redisClient.insert(handlerInfo, key, value, expirationTime);
    },
    delete : async function (handlerInfo, key){
        return await redis.del();
    }
}

module.exports.redis = redis;
module.exports.redisClient = redisClient;