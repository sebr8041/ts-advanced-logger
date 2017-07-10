import { IEndpoint } from "./i-endpoint"
import { IRvLog } from "../i-rv-log";
import { IRvLogConverter } from "../converter/i-rv-log-converter";
import { BufferService } from "../../service/buffer-service"

export class BufferedAjaxEndpoint implements IEndpoint {

    /**
     * converter to convert IRvLog[] to string representation
     */
    private converter: IRvLogConverter = null;

    /**
     * server url
     */
    private url: string = null;

    /**
     * buffer storage before sending to server.
     */
    private static buffer: BufferService = null;

    constructor(maxBufferSize: number) {
        if (BufferedAjaxEndpoint.buffer === null) {
            BufferedAjaxEndpoint.buffer = new BufferService(maxBufferSize, true)
            // register callback
            BufferedAjaxEndpoint.buffer.registerCallbackFlushingBuffer((elements) => {
                console.log("flushing buffer...")
                // send to server
                console.log("res will send: ", JSON.stringify(elements))
                this.postToServer(this.converter.manyToString(elements))
            })
        }
        BufferedAjaxEndpoint.buffer.setMaxSize(maxBufferSize)

    }

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

        BufferedAjaxEndpoint.buffer.add(log)
    }

    /**
     * sets the url endpoint 
     */
    setUrl(url: string): void {
        this.url = url
    }

    /**
     * send a message via ajax to server endpoint url
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