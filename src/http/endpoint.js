const Request = require("./Request");

/**
 * @param {Array<Endpoint>} endpoints 
 * @param {Request} request 
 * @returns {Array<Endpoint>} 
 */
module.exports.filterByPath = (endpoints, request) => endpoints.filter((endpoint) => {

    const currentParams = request.url.split("/");
    const requiredParams = endpoint.infos.path.split("/");

    if (currentParams.length !== requiredParams.length)
        return false;

    endpoint.params = {};

    for (let i = 0; i < requiredParams.length; i++)
        if (requiredParams[i].startsWith(":"))
            if (currentParams[i])
                endpoint.params[requiredParams[i].slice(1)] = currentParams[i];
            else
                return false;
        else if (requiredParams[i].toLowerCase() !== currentParams[i].toLowerCase())
            return false;

    return true;
});

/**
 * @typedef Endpoint 
 * @property {EndpointInfos} infos 
 * @property {Object} params 
 * @property {Function} run 
 */

/**
 * @typedef EndpointInfos 
 * @property {string} path 
 * @property {string} method 
 * @property {boolean} requireAuth 
 */