
import { IEndpoint } from '../rv/endpoint/i-endpoint';
import { EndpointFactoryException } from "./endpoint-factory-exception";
import { LogLevelChecker } from "../service/log-level-checker"
import {LoggerConfig} from "../config/config"
export class EndpointFactory {

    private static endpointInstance: IEndpoint = null;

    /**
     * Sets the default-endpoint that will be used, if no other endpoint is defined.
     * @param endpoint The Default-Endpoint instance.
     */
    public static setDefaultEndpoint(endpoint: IEndpoint) {
        EndpointFactory.endpointInstance = endpoint
    }

    /**
     * Returns the default-endpoint.
     */
    public static getDefaultEndpoint(): IEndpoint {
        if (EndpointFactory.endpointInstance === null) {
            EndpointFactory.endpointInstance = LoggerConfig.getLoggerConfig().rvEndpoint
        }

        return EndpointFactory.endpointInstance;
    }

}
