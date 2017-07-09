import "source-map-support/register";

import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { IRvLog } from "../../main/rv/i-rv-log"
import { StreamRvLogConverter } from "../../main/rv/converter/stream-rv-log-converter"

@suite class StreamRvLogConverterSuite {
    @test public "Stream Converter converts in right format"() {
        let log: IRvLog = {
            "timestamp": "2017-07-09T10:39:34.712Z",
            "clientId": "0aefc98f-dfb2-4861-a451-134b300fb570",
            "logNumber": 3,
            "methodName": "MyClassForRV.sumUp",
            "arguments": [5, 6],
            "result": 11,
            "executionTimeMS": 0
        }

        let converter = new StreamRvLogConverter();
        let result = converter.toString(log)

        assert.equal(`3: timestamp = "2017-07-09T10:39:34.712Z" 
3: clientId = "0aefc98f-dfb2-4861-a451-134b300fb570" 
3: logNumber = 3 
3: executionTimeMS = 0 
3: methodName = "MyClassForRV.sumUp" 
3: result = "11" 
3: arguments[0] = "5" 
3: arguments[1] = "6" 
`, result)
    }

    @test public "Stream Converter converts in right format without args"() {
        let log: IRvLog = {
            "timestamp": "2017-07-09T10:39:34.712Z",
            "clientId": "0aefc98f-dfb2-4861-a451-134b300fb570",
            "logNumber": 3,
            "methodName": "MyClassForRV.sumUp",
            "arguments": [],
            "result": 11,
            "executionTimeMS": 0
        }

        let converter = new StreamRvLogConverter();
        let result = converter.toString(log)

        assert.equal(`3: timestamp = "2017-07-09T10:39:34.712Z" 
3: clientId = "0aefc98f-dfb2-4861-a451-134b300fb570" 
3: logNumber = 3 
3: executionTimeMS = 0 
3: methodName = "MyClassForRV.sumUp" 
3: result = "11" 
`, result)
    }


    @test public "Stream Converter converts in right format without result"() {
        let log: IRvLog = {
            "timestamp": "2017-07-09T10:39:34.712Z",
            "clientId": "0aefc98f-dfb2-4861-a451-134b300fb570",
            "logNumber": 3,
            "methodName": "MyClassForRV.sumUp",
            "arguments": [],
            "result": null,
            "executionTimeMS": 0
        }

        let converter = new StreamRvLogConverter();
        let result = converter.toString(log)

        assert.equal(`3: timestamp = "2017-07-09T10:39:34.712Z" 
3: clientId = "0aefc98f-dfb2-4861-a451-134b300fb570" 
3: logNumber = 3 
3: executionTimeMS = 0 
3: methodName = "MyClassForRV.sumUp" 
3: result = "null" 
`, result)
    }

}


