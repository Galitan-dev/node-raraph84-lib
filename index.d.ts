import { IncomingMessage, Server, ServerResponse } from "http";

export class HttpServer extends EventEmitter {
    #server: Server;

    listen(port: number): Promise<void>;
    
    on(event: "listening", listener: (port: number) => void): void;
    on(event: "rawRequest", listener: (req: IncomingMessage, res: ServerResponse, data: string) => void): void;
    on(event: "request", listener: (req: Request) => void): void;
}

export class Request {
    req: IncomingMessage;
    res: ServerResponse;
    data: string;
    method: string;
    ip: string;
    url: string;
    searchParams: URLSearchParams;
    constructor(req: IncomingMessage, res: ServerResponse, data: string);
    end(code: number, data: object| string): void;
}

export interface Endpoint {
    infos: {
        path: string;
        method: string;
        requireAuth: boolean;
    };
    params: object;
    run(): void;
}

export namespace Endpoint {
    export function filterByPath(endpoints: Endpoint[], request: Request): Endpoint[];
}

export namespace Duration {
    export function format(time: number): string;
}
