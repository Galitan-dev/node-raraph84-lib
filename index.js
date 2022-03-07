const Endpoint = require('./src/http/endpoint');

module.exports = {
    Endpoint,
    endpoint: Endpoint.endpoint,
    HttpServer: require('./src/http/server'),
    Request: require('./src/http/request'),
    Duration: require('./src/time/duration')
};