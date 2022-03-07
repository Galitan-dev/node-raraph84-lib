const EventEmitter = require("events");
const Request = require("./Request");

module.exports = class Endpoint extends EventEmitter{

    /** @type {StringMap} */
    #params = {}; 

    /**
     * @param {string} path 
     * @param {boolean} [requireAuth]
     */
    constructor(path, requireAuth = false) {
        super();

        this.path = path;
        this.requireAuth = requireAuth;
    }

    /**
     * @param {string} path 
     * @param {boolean} [requireAuth]
     * @return {Endpoint}
     */
    static endpoint(path, requireAuth = false) {
        return new Endpoint(path, requireAuth);
    }

    /**
     * @param {Request} req
     * @return {boolean}
     */
    run(req) {
        req.appendParams()
        this.emit(req.method)
        return this.listenerCount(req.method) > 0;
    }

    /**
     * @param {(req: Request) => void} listener 
     * @return {Endpoint}
     */
    get(listener) {
        this.on('GET', listener);
        return this;
    }

    /**
     * @param {(req: Request) => void} listener 
     * @return {Endpoint}
     */
    post(listener) {
        this.on('POST', listener);
        return this;
    }

    /**
     * @param {(req: Request) => void} listener 
     * @return {Endpoint}
     */
    put(listener) {
        this.on('PUT', listener);
        return this;
    }

    /**
     * @param {(req: Request) => void} listener 
     * @return {Endpoint}
     */
    patch(listener) {
        this.on('PATCH', listener);
        return this;
    }

    /**
     * @param {Endpoint[]} endpoints 
     * @param {Request} request 
     * @returns {Endpoint[]}} 
     */
    static filterByPath = (endpoints, request) => endpoints.filter((endpoint) => {
        const currentParams = request.url.split("/");
        const requiredParams = endpoint.path.split("/");

        if (currentParams.length !== requiredParams.length)
            return false;
        
        endpoint.#params = {};

        for (let i = 0; i < requiredParams.length; i++)
            if (requiredParams[i].startsWith(":"))
                if (currentParams[i])
                    endpoint.#params[requiredParams[i].slice(1)] = currentParams[i];
                else
                    return false;
            else if (requiredParams[i].toLowerCase() !== currentParams[i].toLowerCase())
                return false;

        return true;
    });

};
