
export interface IRvLog {
    timestamp: number;
    clientId: string;
    logNumber: number;
    methodName: string;
    arguments: any[];
    result: any;
    executionTimeMS: number;
}