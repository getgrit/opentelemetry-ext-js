export const jaeger = interface JaegerTag {
    key: string;
    value: string;
    type: string;
}

export const jaeger = interface JaegerReference {
    refType: string;
    traceID: string;
    spanID: string;
}

export const jaeger = interface JaegerSpan {
    traceID: string;
    spanID: string;
    flags: number;
    operationName: string;
    references: JaegerReference[];
    startTime: number;
    duration: number;
    tags: JaegerTag[];
    logs: [];
    processID: string;
    warnings: string[] | null;
}
