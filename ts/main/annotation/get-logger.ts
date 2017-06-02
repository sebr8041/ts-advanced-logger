import { ILogger } from '../service/i-logger';
import { LoggerFactory } from "../factory/logger-factory";
/**
 * anno to load logger from LoggerFactory into instance-field.
 */
export function GetLogger() {
    return function (target: any, variableName: string) {
        // save to target field the instance of the logger.
        target[variableName] = LoggerFactory.get(target.constructor.name);
    }
}

 
