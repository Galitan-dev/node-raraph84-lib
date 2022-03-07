const EventEmitter = require("events");
const Http = require("http");
const Request = require("./Request");
const dirTree = require("directory-tree");
const { readFileSync } = require("fs");

module.exports = class HttpServer extends EventEmitter {

    /** @type {Http.Server} */
    #server = null;

    /** @type {{publicDir: string, options: import("directory-tree").DirectoryTreeOptions}} */
    #staticConfig = null;


    constructor() {

        super();

        this.#server = Http.createServer((req, res) => {

            let data = "";
            req.on("data", (chunk) => data += chunk);

            req.on("end", () => {
                if (this.#staticConfig) {
                    const file = HttpServer.searchFile(
                        this.#staticConfig.publicDir,
                        req.url,
                        this.#staticConfig.options
                    );
                    if (file) {
                        res.writeHead(200);
                        return res.end(file);
                    }
                }

                this.emit("rawRequest", req, res, data);
                this.emit("request", new Request(req, res, data));
            });
        });
    }

    /**
     * @param {string} publicDir 
     * @param {import("directory-tree").DirectoryTreeOptions} [options]
     */
    static(publicDir, options) {
        this.#staticConfig = {
            publicDir, options
        }
    }

    /**
     * @param {Number} port 
     * @returns {Promise} 
     */
    listen(port = 80) {
        return new Promise((resolve, reject) => {
            this.#server.listen(port, () => {
                resolve();
                this.emit("listening", port);
            });
        });
    }

    
    /**
     * Loop a directory 
     * @param {string} publicDir 
     * @param {string} searchPath 
     * @param {import("directory-tree").DirectoryTreeOptions} [options]
     * @returns {string | undefined}
     */
    static searchFile(publicDir, searchPath, options) {
        let file;
        
        dirTree(publicDir, options, (item, path, _) => {
            path = path.substring(publicDir.length);
            if (file) return;
            if (
                path !== searchPath &&
                (
                    !item.name.match('^index\.(html|css|js)$') ||
                    path.split('/').slice(0, -1).join('/') + '/' !== searchPath
                ) &&
                (
                    !item.name.match(`^${searchPath.split('/').at(-1)}\.(html|htm|css|js)$`) ||
                    path.split('/').slice(0, -1).join('/') !== searchPath.split('/').slice(0, -1).join('/')
                )
            ) return;
            file = readFileSync(item.path, 'utf8');
        });
        
        return file;
    }
        
        
}