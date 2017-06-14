export interface ILogger {
    error(message?: any, ...optionalParams: any[])
    warn(message?: any, ...optionalParams: any[])
    info(message?: any, ...optionalParams: any[])
    debug(message?: any, ...optionalParams: any[])

    setClassName(className: string): void
}