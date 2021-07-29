import * as dotenv from 'dotenv';
import express from 'express';
import * as redis from 'redis';

// env variable
dotenv.config();
const PORT = Number(process.env.PORT) || 4200;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

// Before create a redis client, make sure the redis server is running
const client = redis.createClient({
    port:REDIS_PORT, 
    host: REDIS_HOST
});
client.on('error', function (error) {
    console.error(error);
});

// =============== Command Example ===============
// Example : https://aiii-mike.gitbook.io/redis/command/string/set-get
client.set("foo", "bar", redis.print);
client.get("foo", (err, foo_value) => {
    console.log(foo_value); 
})


// ===============================================

// app listening
const app = express();
app.listen(PORT, () => {
    console.log(`App port :`, PORT);
    console.log(`Redis host :`, REDIS_HOST);
    console.log(`Redis port :`, REDIS_PORT);
});


