import { InstrumentationConfig } from '@opentelemetry/instrumentation';
import { Span } from '@opentelemetry/api';

export const types = interface NodeCacheRequestInfo {
    moduleVersion: string;
    operation: string;
    args: any[];
}

export const types = interface NodeCacheResponseInfo {
    operation: string;
    response: any;
}

export const types = interface NodeCacheInstrumentationConfig extends InstrumentationConfig {
    requestHook?: (span: Span, requestInfo: NodeCacheRequestInfo) => void;
    responseHook?: (span: Span, responseInfo: NodeCacheResponseInfo) => void;
    requireParentSpan?: boolean;
};
