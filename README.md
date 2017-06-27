# ts-advanced-logger
## Build
The following command will create the transpiled files in ./js
* ```npm install```
* ```npm run compile```
## Tests
Use ```npm test``` to run all Test-Suites.

## Specific User Logging
This section contains information about the user logging. 

### Configuration 
The class LogLevelChecker is for configuration on which level the logger should log specific user logs. 
This class is an singleton. The following code example shows an configuration:

```ts
import {LogLevelChecker, LogLevelEnum, LoggerFactory, Logger} from "ts-advanced-logger"

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

// set default logger which should be used to log. The Logger-Class logs normal messages to browser console.
LoggerFactory.setDefaultLogger(Logger)
```

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