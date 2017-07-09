import { IEndpoint } from "./i-endpoint"
import { IRvLog } from "../i-rv-log";
import { IRvLogConverter } from "../converter/i-rv-log-converter";

export class AjaxEndpoint implements IEndpoint {

    private converter: IRvLogConverter = null;
    private url: string = null;

    /**
     * sets converter for this endpoint
     * @param converter 
     */
    setConverter(converter: IRvLogConverter): void {
        this.converter = converter
    }

    /**
     * receive log from RvMethod decorator
     * @param log 
     */
    provide(log: IRvLog): void {
        if (this.converter === null) {
            throw new Error("converter is null.");
        }
        if (this.url === null) {
            throw new Error("endpoint url is null.");
        }

        // send to server
        this.postToServer(this.converter.toString(log))
    }

    /**
     * sets the url endpoint 
     */
    setUrl(url: string): void {
        this.url = url
    }

    /**
     * post to server with ajax.
     * @param message 
     */
    private postToServer(message: string): void {
        let r
        if ((<any>window).XMLHttpRequest) {
            r = new XMLHttpRequest();
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("POST", this.url, true)
        r.setRequestHeader("Content-type", this.converter.getStringContentFormat())
        r.send(message)
    }
}