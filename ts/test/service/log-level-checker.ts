import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { LogLevelChecker, LogLevelEnum } from '../../main/index';

@suite class LogLevelCheckerSuite {

    @test public "isLogEnabled: only defaultLogLevel"() {
        let instance = new LogLevelChecker();
        instance.setDefaultLogLevel(LogLevelEnum.INFO);

        assert.isTrue(instance.isLogEnabled("any", LogLevelEnum.INFO))
        assert.isTrue(instance.isLogEnabled("any", LogLevelEnum.FATAL))
        assert.isTrue(instance.isLogEnabled("any", LogLevelEnum.ERROR))
        assert.isTrue(instance.isLogEnabled("any", LogLevelEnum.WARN))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.DEBUG))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.TRACE))
    }

    @test public "isLogEnabled: specific rules for a class"() {
        let instance = new LogLevelChecker();
        instance.setDefaultLogLevel(LogLevelEnum.FATAL);
        instance.setRules([
            {
                logLevel: LogLevelEnum.INFO,
                className: "MySpeciClass"
            },
            {
                logLevel: LogLevelEnum.DEBUG,
                className: "MySpeciClass2"
            }
        ]);
        // check default log level
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.INFO))
        assert.isTrue(instance.isLogEnabled("any", LogLevelEnum.FATAL))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.ERROR))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.WARN))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.DEBUG))
        assert.isFalse(instance.isLogEnabled("any", LogLevelEnum.TRACE))

        assert.isTrue(instance.isLogEnabled("MySpeciClass", LogLevelEnum.INFO))
        assert.isTrue(instance.isLogEnabled("MySpeciClass", LogLevelEnum.WARN))
        assert.isTrue(instance.isLogEnabled("MySpeciClass", LogLevelEnum.ERROR))
        assert.isTrue(instance.isLogEnabled("MySpeciClass", LogLevelEnum.FATAL))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.DEBUG))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.TRACE))

        assert.isTrue(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.INFO))
        assert.isTrue(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.WARN))
        assert.isTrue(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.ERROR))
        assert.isTrue(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.FATAL))
        assert.isTrue(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.DEBUG))
        assert.isFalse(instance.isLogEnabled("MySpeciClass2", LogLevelEnum.TRACE))
    }

    @test public "isLogEnabled: specific rules for a class 2"() {
        let instance = new LogLevelChecker();
        instance.setDefaultLogLevel(LogLevelEnum.INFO);
        instance.setRules([
            {
                logLevel: LogLevelEnum.FATAL,
                className: "MySpeciClass"
            }
        ]);

        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.INFO))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.WARN))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.ERROR))
        assert.isTrue(instance.isLogEnabled("MySpeciClass", LogLevelEnum.FATAL))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.DEBUG))
        assert.isFalse(instance.isLogEnabled("MySpeciClass", LogLevelEnum.TRACE))
    }
}