const winston = require('winston');
const moment = require('moment-timezone');

class StringTransport extends winston.Transport {
  constructor(opts) {
    super(opts);
    this.logString = '';
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    //------------Include Timestamp if necessary------------
    // const message = `${info.timestamp} ${info.level}: ${info.message}`;
    const message = `${info.level}: ${info.message}`;
    this.logString = message;
    callback();
  }
}

//------------Include Timestamp if necessary------------
// const logFormat = winston.format.printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });
const logFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format((info, opts) => {
   
      return info;
    })(),
   
    logFormat
  ),
  transports: [
    new StringTransport(),
    new winston.transports.Console(),
    
  ]
});

module.exports = logger;
