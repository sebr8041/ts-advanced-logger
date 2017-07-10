import { IEndpoint } from "./i-endpoint"
import { IRvLog } from "../i-rv-log";
import { IRvLogConverter } from "../converter/i-rv-log-converter";
import { BufferedAjaxEndpoint } from "./buffered-ajax-endpoint"

export class AjaxEndpoint extends BufferedAjaxEndpoint {

    constructor(){
        // bufferend ajax endpoint with buffer size 1
        super(1);
    }

}