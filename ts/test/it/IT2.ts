import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { ILogger, GetLogger, Logger, LoggerFactory } from "../../main/index"

LoggerFactory.setDefaultLogger(Logger)


@suite class IT2Suite {

    @GetLogger()
    private logger: ILogger;


    @test public "Logger logs a message on console"() {
        this.logger.error("My Error Message!");
        assert.isTrue(true)
    }
}