import { IEndpoint } from "./i-endpoint"
import { IRvLog } from "../i-rv-log";
import { IRvLogConverter } from "../converter/i-rv-log-converter";

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
    private buffer: IRvLog[] = [];

    /**
     * max size of buffer storage before sending it to the server endpoint url
     */
    private batchSize: number = 3;

    /**
     * register buffer flush before user leave the page.
     */
    constructor() {
        window.addEventListener("beforeunload", (() => {
            console.log("beforeunload flushing buffer...")
            this.flushBuffer()
        }))
    }

    /**
     * sets converter for this endpoint
     * @param converter 
     */
    setConverter(converter: IRvLogConverter): void {
        this.converter = converter
    }

    /**
     * set the batch size for the buffer.
     * @param size 
     */
    setBatchSize(size: number) {
        this.batchSize = size;
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

        this.buffer.push(log);

        if (this.buffer.length >= this.batchSize) {
            this.flushBuffer();
        }
    }

    /**
     * sets the url endpoint 
     */
    setUrl(url: string): void {
        this.url = url
    }

    /**
     * flushes the buffer. send to server and clear
     */
    private flushBuffer() {
        console.log("flushing buffer...")
        // send to server
        this.postToServer(this.converter.manyToString(this.buffer))
        this.buffer = [];
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