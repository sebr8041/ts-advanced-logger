# ts-advanced-logger
Our Typescript advanced logger supports two main features:
* Specific Logging by developers
* Automatically Runtime Verification Logging

## Gettings started
### Install
First of all, add the ts-advanced-logger to your project.
```
npm install ts-advanced-logger
```
You can use the Logger out of the box. For detailed configuration options, see the following configuration-chapter.

### Write your first log
To write a log, you only need an instance of the ts-advanced-logger and call a log-method. Lets see how it works:
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
To access your logger, you can use the GetLogger-Decorator. This will inject an instance of your into the decorated field. All accessable methods are defined in the ILogger-Interface.

Now you can use your logger-instance, to log on different logging-levels.

## Configuration
You can use this logger as a simple wrapper for the JavaScript console-object, if you fish. But you can do much more with it.

You can:
* Define Log-Levels for each Class
* Send your logs to a Server-Enpoint, to see what your Clients are doing
* Monitor your programs behaviour, by observing method invocations

This Chapter shows how to configure all these features.

### Define Log-Levels
There is a Default-Configuration, that simply can be extended by your own Configuration. Lets see how to set the Log-Level for aboved FooClass to warn, by extending the Default-Configuration.

```ts
import { DefaultLoggerConfig, ILogLevelRule, LogLevelEnum } from "ts-advanced-logger"

class MyConfig extends DefaultLoggerConfig {
    rules: ILogLevelRule[] = [{
        className: "FooClass",
        logLevel: LogLevelEnum.WARN
    }]
}

// tell the ts-advanced-logger to use your configuration
LoggerConfig.setConfig(new MyConfig())
```

### Send Logs to a Server
The following example show, how to configure the logger, that it will send all Logs to your Server-Endpoint. This might be very helpful to find bugs on production.

To send Logs to a Server, ts-advanced-logger comes with a so called BufferedRemoteLogger.
We will do the following steps:
* Change the default-logger from ConsoleLogger to BufferedRemoteLogger
* Define where to send the Logs
* Define the bufferSize, that will be used to collect an amount of bufferSize Logs and sends them all together.

```ts
import { DefaultLoggerConfig, BufferedRemoteLogger} from "ts-advanced-logger"

class MyConfig extends DefaultLoggerConfig {
    defaultLoggerClass = new BufferedRemoteLogger()
    serverEnpoint = "https://myService.tld/loggingEndpoint"
    bufferSize = 10
}

// tell the ts-advanced-logger to use your configuration
LoggerConfig.setConfig(new MyConfig())
```
The Logs will be converted in a JSON-format and sent as a HTTP-Post request.



## Runtime Verification
With ts-advanced-logger you can observe method invocations to monitor your programs behaviour. This can be very usefull e.g. for verifying that your program respects some properties, that you defined. You may check thinks like "This method must not return null".
Feel free to use any solution you want, to process your logs. You can use Hadoop for instance.

Lets see, how to do Runtime Verification using ts-advanced-logger.

To observe a method, you simply can add the @RVMethod-Decorator.

```ts
import { RVMethod } from "ts-advanced-logger"

class BarClass {

    @RVMethod()
    public sumUp(a:number, b:number): number {
        return a+b
    }

}
```
Now every invocation of the sumUp method will the tracked. Now lets do some configuration to send these Logs to a Server.

```ts
import { DefaultLoggerConfig, BufferedRemoteLogger } from "ts-advanced-logger"

class MyConfig extends DefaultLoggerConfig {
    bufferSize = 10
    // use a ajaxBuffer to send data to the endpoint
    rvEndpoint: IEndpoint = new BufferedAjaxEndpoint(this.bufferSize)
    
    constructor() {
        // use a converter, that will convert the logs to JSON
        this.rvEndpoint.setConverter(new JsonRvLogConverter())
        // set the server enpoints url
        this.rvEndpoint.setUrl("https://myService.tld/rvLogging")
    }
}

// tell the ts-advanced-logger to use your configuration
LoggerConfig.setConfig(new MyConfig())
```
Using this configuration, the logs will be sent as a JSON-Array using a HTTP-POST request. See an example, how the JSON will look like:

```json
{   
    "timestamp":"2017-07-26T13:26:51.236Z","clientId":"1d4b182f-b0b5-4c84-a696-b364e8a55910",
    "logNumber":3,
    "methodName":"BarClass.sumUp",
    "arguments":[10, 5],
    "result":15,
    "executionTimeMS":1
}
```
The clientId is an unique identifier for the client, that will be generated once, when the logger needs the id for the first time.

The logNumber is an auto-incrementing number to track the order of method-invocations.


## Build the project
The following command will create the transpiled files in ./js
* ```npm install```
* ```npm run compile```
## Tests
Use ```npm test``` to run all Test-Suites.