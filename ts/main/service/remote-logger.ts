import { ILogger } from './i-logger';


export class RemoteLogger implements ILogger {

    private className: string;

    constructor() {

    }

    public setClassName(cN: string) {
        this.className = cN;
    }

    public error(message?: any, ...optionalParams: any[]) {
    }

    public warn(message?: any, ...optionalParams: any[]) {
    }

    public info(message?: any, ...optionalParams: any[]) {
    }

    public debug(message?: any, ...optionalParams: any[]) {
    }
 

}
