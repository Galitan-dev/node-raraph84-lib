const { endpoint } = require("../..");
const { textSync: bigText } = require("figlet");

/** @type {Endpoint[]} */
module.exports = [

    endpoint("/hello")
        .get(req => req.end(200, bigText("Hello World !"))),
    
    endpoint("/hello/:name")
        .get(req => req.end(200, bigText(`Hello ${req.params.name ?? "Anonymous"} !`))),
    
];
