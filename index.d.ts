import { DirectoryTreeOptions } from "directory-tree";
import EventEmitter from "events";
import { IncomingMessage, ServerResponse } from "http";

declare type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export class HttpServer extends EventEmitter {

    static(publicDir: string, options?: DirectoryTreeOptions): void;
    listen(port: number): Promise<void>;
    
    on(event: "listening", listener: (port: number) => void): void;
    on(event: "rawRequest", listener: (req: IncomingMessage, res: ServerResponse, data: string) => void): void;
    on(event: "request", listener: (req: Request) => void): void;

    static searchFile(publicDir: string, searchPath: string, options?: DirectoryTreeOptions): void;
}

declare type StringMap = Map<string, string>;

export class Request {
    req: IncomingMessage;
    res: ServerResponse;
    data: string;
    method: Method;
    ip: string;
    url: string;
    searchParams: URLSearchParams;
    params: StringMap;
    
    constructor(req: IncomingMessage, res: ServerResponse, data: string);

    json(code: number, data: StringMap | string): void;
    end(code: number, data: string): void;
    appendParams(params: StringMap): Request;
}

export class Endpoint extends EventEmitter {

    constructor(path: string, requireAuth?: boolean);

    run(req: Request): boolean;
    
    get(listener: (req: Request) => void): Endpoint;
    post(listener: (req: Request) => void): Endpoint;
    put(listener: (req: Request) => void): Endpoint;
    patch(listener: (req: Request) => void): Endpoint;

    on(event: Method, listener: (req: Request) => void): void;
    
    static filterByPath(endpoints: Endpoint[], request: Request): Endpoint[];
    static endpoint(path: string, require: boolean): Endpoint;
}

export namespace Duration {
    export function format(time: number): string;
}
