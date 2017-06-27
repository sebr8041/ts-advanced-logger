# ts-advanced-logger
Our Typescript advanced logger supports two main features:
* Specific Logging by developers
* Automatically Runtime Verification Logging

## Specific Logging by developers
This section contains information about the user logging. 

### Configuration 
The class LogLevelChecker is for configuration on which level the logger should log specific user logs. 
This class is an singleton. The following code example shows an configuration:

```ts
import {LogLevelChecker, LogLevelEnum, LoggerFactory, ConsoleLogger, RemoteLogger} from "ts-advanced-logger"

// load the singleton
let instance = LogLevelChecker.get();

// set global log level. this log level will be overwritten by specific rules
instance.setDefaultLogLevel(LogLevelEnum.FATAL);

// set specific rules. 
instance.setRules([
    {
        logLevel: LogLevelEnum.INFO,
        className: "FooClass"
    },
    {
        logLevel: LogLevelEnum.DEBUG,
        className: "BarClass"
    }
]);

// OPTION A: Log on browser console
// set default logger which should be used to log. The Logger-Class 
// logs normal messages to browser console.
LoggerFactory.setDefaultLogger(ConsoleLogger)

// OPTION B: Log on remote server
// set the url where logger should send logs via POST in REST Format.
RemoteLogger.setServerUrl("http://localhost/myServerToGetLogs")
// set as defaultlogger
LoggerFactory.setDefaultLogger(RemoteLogger)
```

We support currently the ConsoleLogger and RemoteLogger. You can implement your own logger by writting a class which extends LoggerWithChecker. The following example shows an example implementation:

```ts
import{LoggerWithChecker} from "ts-advanced-logger"

class MyLogger extends LoggerWithChecker{

    protected logFatal(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        // own implementation. 
    }
}
```

All logger which get extended by LoggerWithChecker supports automatically the LogLevelChecker Configuration.

### Usage
The following example shows an usage example:

```ts
import {GetLogger, ILogger} from "ts-advanced-logger"

class FooClass {

    @GetLogger()
    private logger: ILogger

    constructor() {
    }

    public bar(): void {
        this.logger.debug("Some debug message!");
        this.logger.info("Some info!");
        this.logger.warn("Oh warning!");
        this.logger.error("Some error occured!");
    }
}
```

With the configuration Specific User Configuration this example would log the info, warn and error message to console, because there is a specific rule for FooClass.

## Automatically Runtime Verification Logging
TODO

## Build the project
The following command will create the transpiled files in ./js
* ```npm install```
* ```npm run compile```
## Tests
Use ```npm test``` to run all Test-Suites.