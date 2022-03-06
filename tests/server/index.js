const { HttpServer } = require("../..");

const server = new HttpServer();
const PORT = process.env.PORT || 8080

server.on("request", (req) => {
    req.end(200, { hello: 'world' });
});

server.on("listening", port => {
    console.log('Server listening on port ' + port);
})

server.listen(PORT);
