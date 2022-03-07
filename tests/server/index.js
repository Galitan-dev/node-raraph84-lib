const { HttpServer } = require("../..");
const dirTree = require("directory-tree");
const PATH = require("path");
const { readFileSync } = require("fs");

const PORT = process.env.PORT ?? 8080;
const PUBLIC_DIR = process.env.PUBLIC_DIR ?? PATH.join(__dirname, "public")

const server = new HttpServer();

server.on("request", (req) => {
    try {
        const file = searchFile(PUBLIC_DIR, req.url);
        if (file) {
            return req.end(200, file);
        }

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

/**
 * Loop a directory 
 * @param {string} publicDir 
 * @param {string} searchPath 
 * @param {import("directory-tree").DirectoryTreeOptions} [options]
 * @returns {string | undefined}
 */
function searchFile(publicDir, searchPath, options) {
    let file;

    dirTree(publicDir, options, (item, path, _) => {
        path = path.substring(publicDir.length);
        if (file) return;
        if (
            path !== searchPath &&
            (item.name !== 'index.html' || !searchPath.endsWith('/')) &&
            path.replace(/.[^.]*$/, '') !== searchPath
        ) return;
        file = readFileSync(item.path, 'utf8');
    });

    return file;
}
