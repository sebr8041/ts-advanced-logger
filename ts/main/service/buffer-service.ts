
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import { LogLevelEnum } from "../enum/log-level-enum";
import { LoggerWithChecker } from './logger-with-checker';

/**
 * buffer to store max X elements before flushing.
 */
export class BufferService {

    /**
     * max size of buffer before flushing
     */
    private maxSize: number;

    /**
     * buffer elements storage
     */
    private elements: any[] = [];

    /**
     * registered callback storage
     */
    private callbacks: ((elements: any[]) => void)[] = [];

    /**
     * 
     * @param maxSize max size of the buffer before flushing.
     * @param unloadFlushing should a final flush on window.unload happens?
     */
    constructor(maxSize: number, unloadFlushing?: boolean) {
        this.maxSize = maxSize
        if (unloadFlushing) {
            this.registerUnloadFlushing()
        }
    }

    /**
     * sets the maxSize of this buffer
     * @param maxSize 
     */
    public setMaxSize(maxSize:number){
        this.maxSize = maxSize
    }

    /**
     * register unload flushing
     */
    private registerUnloadFlushing() {
        console.log("register beforeunload buffer flushing")
        window.addEventListener("beforeunload", (() => {
            console.log("beforeunload flushing buffer...")
            this.flushBuffer()
        }))
    }

    /**
     * add an element to the buffer
     * @param ele 
     */
    public add(ele: any) {
        this.elements.push(ele)

        // when buffer full => flush
        if (this.maxSize <= this.elements.length) {
            this.flushBuffer()
        }
    }

    /**
     * current size of the buffer
     */
    public size(): number {
        return this.elements.length
    }

    /**
     * flush all elements in this buffer
     */
    public flushBuffer() {
        this.callbacks.map((callback) => callback(this.elements))
        this.elements = []
    }

    /**
     * register callback.
     * callback will be called when this buffer get flushed
     * @param callback 
     */
    public registerCallbackFlushingBuffer(callback: (elements) => void) {
        this.callbacks.push(callback)
    }
}


