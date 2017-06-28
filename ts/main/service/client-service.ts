
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import { LogLevelEnum } from "../enum/log-level-enum";
import { LoggerWithChecker } from './logger-with-checker';

/**
 * normal logger implementation to to on the browser console.
 */
export class ClientService {

    /**
     * saves uuid for this client
     */
    private static uuid: string = null;

    /**
     * log number for next log!
     */
    private logNumber: number;

    /**
     * init logNumber and uuid
     */
    constructor() {
        // generate only one client id.
        if (ClientService.uuid === null) {
            ClientService.uuid = this.generateRandomClientId();
        }
        this.logNumber = 0;
    }

    /**
     * generates a new uuId v4 and return this.
     */
    private generateRandomClientId(): string {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * returns the next log number for this client.
     */
    public nextLogNumber(): number {
        return this.logNumber++;
    }

    /**
     * returns the client id.
     */
    public getClientId() {
        return ClientService.uuid;
    }

}


