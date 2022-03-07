const { HttpServer } = require("../..");
const PATH = require("path");

const PORT = process.env.PORT ?? 8080;
const PUBLIC_DIR = process.env.PUBLIC_DIR ?? PATH.join(__dirname, "public")

const server = new HttpServer();
server.static(PUBLIC_DIR);

server.on("request", (req) => {
    try {
        req.end(404);
    } catch (err) {
        console.error(err);
        req.end(500);
    }
});

server.on("listening", port => {
    console.log('Server listening on port ' + port);
})

server.listen(PORT);
