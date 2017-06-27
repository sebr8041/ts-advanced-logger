import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { ILogger, GetLogger, Logger, LoggerFactory, LogLevelChecker, LogLevelEnum } from "../../main/index"



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

    @GetLogger(Logger)
    private logger: ILogger;

    @test public "Logger logs a message on console"() {

        let currentCounter = consoleErrorCallCounter;

        this.logger.error("My Error Message!");
        // check console.error get called.
        assert.isTrue(currentCounter < consoleErrorCallCounter)
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