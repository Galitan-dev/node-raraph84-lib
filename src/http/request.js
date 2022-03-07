const { IncomingMessage, ServerResponse } = require("http");

module.exports = class Request {

    /**
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @param {String} data 
     */
    constructor(req, res, data) {

        this.req = req;
        this.res = res;
        this.data = data;
        this.method = req.method.toUpperCase();
        this.ip = req.headers["x-forwarded-for"] || "127.0.0.1";
        this.params = {};

        const urlSplitted = req.url.split("?");
        this.url = urlSplitted.shift();
        this.searchParams = new URLSearchParams(urlSplitted.join("?"));
        if (this.url.endsWith("/") && this.url !== "/") this.url = this.url.slice(0, this.url.length - 1);
    }

    /**
     * @param {import("../..").StringMap} params 
     * @returns {Request}
     */
    appendParams(params) {
        this.params = params;
        return this;
    }

    /**
     * @param {Number} code 
     * @param {import("../..").StringMap|string} data 
     */
    json(code, data) {

        if (typeof data === "object" || typeof data === "string")
            this.res.setHeader("Content-Type", "application/json");

        this.res.writeHead(code);

        if (typeof data === "object") this.res.end(JSON.stringify(Object.assign({ code }, data)));
        else if (typeof data === "string") this.res.end(JSON.stringify({ code, message: data }));
        else this.res.end();
    }

    /**
     * @param {number} code 
     * @param {string} data 
     */
    end(code, data) {
        this.res.writeHead(code);
        this.res.end(data);
    }
}