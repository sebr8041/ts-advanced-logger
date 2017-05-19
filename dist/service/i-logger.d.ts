export interface ILogger {
    error(message?: any, ...optionalParams: any[]): any;
    warn(message?: any, ...optionalParams: any[]): any;
    info(message?: any, ...optionalParams: any[]): any;
    debug(message?: any, ...optionalParams: any[]): any;
}
