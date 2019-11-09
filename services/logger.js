const {createLogger,format,transports} = require('winston');

//configuring the winston logger

const logger = createLogger({
    level:'info',
    format: format.combine(
        format.splat(),
        format.simple()
    ),
    transports:[
        new transports.Console()
    ],
});

module.exports = logger;