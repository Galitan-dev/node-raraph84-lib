const { Endpoint } = require("../..");
const { textSync: bigText } = require("figlet");

/** @type {Endpoint[]} */
module.exports = [
    {
        infos: {
            method: "GET",
            path: "/hello",
            requireAuth: false,
        },
        run(req) {
            req.end(200, bigText("Hello World !"));
            return true;
        }
    },
    {
        infos: {
            method: "GET",
            path: "/hello/:name",
            requireAuth: false,
        },
        run(req) {
            req.end(200, bigText(`Hello ${this.params.name ?? "Anonymous"} !`));
            return true;
        }
    }
];
