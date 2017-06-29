import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { ILogger, GetLogger, ConsoleLogger, LoggerFactory, LogLevelChecker, LogLevelEnum } from "../../main/index"



/**
 * mock simulation for console.error.
 * so check method get called by counting global variable
 */
let consoleErrorCallCounter = 0;
console.error.apply = function (a, b) {
    consoleErrorCallCounter++;
}

/**
 * test suite 2 for testing logger.
 */
@suite class IT2Suite {

    @GetLogger(ConsoleLogger)
    private logger: ILogger;

    @test public "Logger logs a message on console"() {

        let currentCounter = consoleErrorCallCounter;

        this.logger.error("My Error Message!");
        // check console.error get called.
        assert.isTrue(currentCounter < consoleErrorCallCounter)
    }

    @test public "Log string to console"() {
        let readMessage
        console.warn = function (message?: any, ...optionalParams: any[]) {
            readMessage = arguments
        }

        this.logger.warn("hello")
        assert.equal('{"0":"WARN IT2Suite: ","1":"hello"}', JSON.stringify(readMessage))
    }

    @test public "Log object to console"() {
        let obj = { a: 10, b: 'c' }
        let readMessage
        console.warn = function (message?: any, ...optionalParams: any[]) {
            readMessage = arguments
        }

        this.logger.warn(obj)

        assert.equal('{"0":"WARN IT2Suite: ","1":{"a":10,"b":"c"}}', JSON.stringify(readMessage))
    }

    @test public "Log two objects to console"() {
        let obj = { a: 10, b: 'c' }
        let readMessage
        console.warn = function (message?: any, ...optionalParams: any[]) {
            readMessage = arguments
        }

        this.logger.warn(obj, obj)

        assert.equal('{"0":"WARN IT2Suite: ","1":{"a":10,"b":"c"},"2":{"a":10,"b":"c"}}', JSON.stringify(readMessage))
    }

    @test public "Log string to debug and console.debug is undefined"() {
        let readMessage
        console.debug = undefined
        this.logger.debug("Test")
    }

    @test public "Log string to debug when console.debug is defined"() {
        let readMessage
        console.debug = function (message?: any, ...optionalParams: any[]) {
            readMessage = arguments
        }
        this.logger.debug("Test")
        assert.equal('{"0":"DEBUG IT2Suite: ","1":"Test"}', JSON.stringify(readMessage))
    }

    @test public "Logger not logs a message on console because loglevelchecker says no!"() {

        // config log on ERROR global
        let checker = LogLevelChecker.get();
        checker.setDefaultLogLevel(LogLevelEnum.FATAL)

        let currentCounter = consoleErrorCallCounter;

        this.logger.error("My Error Message!");
        // check console.error get NOT called.
        assert.isTrue(currentCounter === consoleErrorCallCounter)
    }
}