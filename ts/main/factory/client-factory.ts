
import { ILogger } from '../service/i-logger';
import { LoggerFactoryException } from "./logger-factory-exception";
import { LogLevelChecker } from "../service/log-level-checker"
import { ClientService } from "../service/client-service"

/**
 * workaround because Map does not exist in es5
 */
interface ClientStorage {
    forClass: new () => any
    instance: ClientService
}

/**
 * Factory to access default-logger.
 */
export class ClientFactory {

    /**
     * storage for all ClientServices in context to classes.
     */
    private static instances: ClientStorage[] = null;

    private static rvInstance: ClientService = null;

    // innit for storage if not happend before
    constructor() {
        if (ClientFactory.instances === null) {
            ClientFactory.instances = [];
        }
    }

    /**
     * returns ClientService insatnce for rv logging.
     */
    public getRvInstance() {
        if (ClientFactory.rvInstance === null) {
            ClientFactory.rvInstance = new ClientService();
        }
        return ClientFactory.rvInstance
    }

    /**
     * returns CleintService for the specific class.
     * @param className 
     */
    public getClientServiceFor(className: new () => any): ClientService {
        // exists in storage?
        let storEle = ClientFactory.instances.filter(ele => ele.forClass === className);

        if (storEle.length < 1) {
            // create new instance
            let newEle = {
                forClass: className,
                instance: new ClientService()
            };

            // push to storage
            ClientFactory.instances.push(newEle)

            return newEle.instance;
        } else {
            // return existing instance for class
            return storEle[0].instance;
        }
    }

}
