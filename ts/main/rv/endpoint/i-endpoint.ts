import { IRvLog } from "../i-rv-log";
import { IRvLogConverter } from "../converter/i-rv-log-converter";
export interface IEndpoint {
    /**
     * sets the converter for this endpoint.
     * the endpoint convert all RvLogs to String with this converter.
     */
    setConverter(converter: IRvLogConverter): void;

    /**
     * this method is called by RVMethod Decorator. every time a new log is available this method will be called.
     */
    provide(log: IRvLog): void;

    /**
     * 
     */
    setUrl(url: string): void;
    
}