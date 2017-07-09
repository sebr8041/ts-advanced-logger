
export interface IRvLog {
    timestamp: string;
    clientId: string;
    logNumber: number;
    methodName: string;
    arguments: any[];
    result: any;
    executionTimeMS: number;
}