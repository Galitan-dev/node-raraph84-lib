import { DirectoryTreeOptions } from "directory-tree";
import { IncomingMessage, ServerResponse } from "http";

export class HttpServer extends EventEmitter {

    static(publicDir: string, options?: DirectoryTreeOptions): void;
    listen(port: number): Promise<void>;
    
    on(event: "listening", listener: (port: number) => void): void;
    on(event: "rawRequest", listener: (req: IncomingMessage, res: ServerResponse, data: string) => void): void;
    on(event: "request", listener: (req: Request) => void): void;

    static searchFile(publicDir: string, searchPath: string, options?: DirectoryTreeOptions): void;
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
    json(code: number, data: object | string): void;
    end(code: number, data: string): void;
}

export interface Endpoint {
    infos: {
        path: string;
        method: string;
        requireAuth: boolean;
    };
    params: object;
    run(req: Request): void;
}

export namespace Endpoint {
    export function filterByPath<E extends Endpoint[]>(endpoints: E, request: Request): E;
}

export namespace Duration {
    export function format(time: number): string;
}
