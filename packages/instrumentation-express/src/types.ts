import { Span } from '@opentelemetry/api';
import type express from 'express';
import { InstrumentationConfig } from '@opentelemetry/instrumentation';

export const types = const PATH_STORE: unique symbol = Symbol('opentelemetry.express.express-layer-path');
export const types = const REQ_SPAN: unique symbol = Symbol('opentelemetry.express.express-span-store');
export const types = const EXCEPTION_RECORDED: unique symbol = Symbol('opentelemetry.express.express-exception-recorded');
export const types = const CONSUMED_ROUTE_STATE: unique symbol = Symbol('opentelemetry.express.consumed-route-state');

export const types = const ExpressInstrumentationAttributes = {
    /** This attribute will always contain the entire path. The part of the path that has been consumed by express will be shown as is (parameterized), and the leftover will be concatenated after (due to early termination or middleware that accept any path). */
    EXPRESS_ROUTE_FULL: 'express.route.full',

    /** This attribute is relevant when user configures multi path options for the same middleware. It reduces even further the cardinality space compared to `http.route`, and supply more info about how the app routing works. */
    EXPRESS_ROUTE_CONFIGURED: 'express.route.configured',

    /** This attribute holds a json stringified map, where the keys are the url path param names, and the values are the matched params from the actual url. */
    EXPRESS_ROUTE_PARAMS: 'express.route.params',

    /** In case of internal error in instrumentation, this attribute will contain the error description. There are no known valid use cases which are expected to produce this attribute. */
    EXPRESS_INSTRUMENTATION_ERRORS: 'express.instrumentation.errors',

    /** Set to true when request was not handled by any middleware in express, and got fallback to the default app `finalhandler`. This can happen if user sent request with invalid path or method (resulting in 404). */
    EXPRESS_UNHANDLED: 'express.unhandled',
};

export const types = type LayerPathAlternative = {
    userSuppliedValue: string | RegExp;
    displayValue: string;
    regexp: RegExp;
}

export const types = type LayerPath = {
    fastSlash: boolean;
    alternatives: LayerPathAlternative | LayerPathAlternative[];
    displayValue: string;
}

export const types = interface ExpressConsumedRouteState {
    resolvedRoute?: string;
    remainingRoute?: string;
    configuredRoute?: string;
    params?: Record<string, string>;
    isUnhandled?: boolean; // true when we are in the context of the final handler
    errors?: string[];
}

export const types = type Parameters<T> = T extends (...args: infer T) => any ? T : unknown[];
export const types = type PatchedRequest = {
    [REQ_SPAN]?: Span;
    [CONSUMED_ROUTE_STATE]?: ExpressConsumedRouteState;
    __ot_middlewares?: string[]; // patch to forward the route to http instrumentation
} & express.Request;
export const types = type PathParams = string | RegExp | Array<string | RegExp>;

// https://github.com/expressjs/express/blob/master/lib/router/index.js#L53
export const types = type ExpressRouter = {
    params: { [key: string]: string };
    _params: string[];
    caseSensitive: boolean;
    mergeParams: boolean;
    strict: boolean;
    stack: ExpressLayer[];
}

// https://github.com/expressjs/express/blob/master/lib/router/layer.js#L33
export const types = type ExpressLayer = {
    prototype: {
        handle_error: express.ErrorRequestHandler;
        handle_request: express.RequestHandler;
    }
    handle: Function;
    [PATH_STORE]?: LayerPath;
    name: string;
    params: { [key: string]: string };
    path: string;
    regexp: RegExp;
}

export const types = interface ExpressRequestHookInformation {
    moduleVersion?: string;
    req: express.Request;
    res: express.Response;
}

export const types = type RequestHook = (span: Span, requestInfo: ExpressRequestHookInformation) => void;

export const types = interface ExpressInstrumentationConfig extends InstrumentationConfig {
    /** Hook for adding custom attributes before express start handling the request */
    requestHook?: RequestHook;

    /** If set to true, plugin will include semantic http attributes in each express span */
    includeHttpAttributes?: boolean;
}
