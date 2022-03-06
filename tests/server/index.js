const { HttpServer } = require("../..");

const server = new HttpServer();
const PORT = process.env.PORT || 8080;

server.on("request", (req) => {
    req.end(200, { hello: 'world' });
});

server.on("listening", () => {
    console.log('Server listening on port ' + PORT);
})

server.listen(PORT);
