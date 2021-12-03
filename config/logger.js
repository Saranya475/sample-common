const fsE = require('fs-extra');
const bunyan = require('bunyan');
const { v4: uuidv4 } = require('uuid');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const edgeNameSpace = require('continuation-local-storage').createNamespace('EDGE');
const logDir = (process.cwd() + '/logs/');
fsE.ensureDirSync(logDir); // it will make sure logDir exists.

function loggerContext(req, res, next) {
  edgeNameSpace.bindEmitter(req);
  edgeNameSpace.bindEmitter(res);
  edgeNameSpace.run(() => {
    const requestId = uuidv4();
    edgeNameSpace.set('requestId', requestId);
    req.headers['Karkinos-Request-ID'] = requestId  // setting Karkinos-Request-ID header in the request.
    next();
  });
};

function getLogger() {
  const logger = new createLoger(bunyan.createLogger({
    name: 'EDGE',
    streams: [{
      stream: new RotatingFileStream({
        gzip: true,                                         // Compress the archive log files to save space
        totalFiles: 5,                                      // Keep up to 5 back copies
        startNewFile: true,                                 // Start a new file everyDay.
        rotateExisting: true,                               // Give ourselves a clean file when we start up, based on period
        path: `${logDir}/edge.log`,                         // File path
        threshold: process.env.LOGGER_THRESHOLD,            // Rotate log files larger than 10 megabytes
        totalSize: process.env.LOGGER_TOTAL_SIZE,           // Don't keep more than specied size of archived log files
        period: process.env.LOGGER_FILE_ROTATION            // Rotation basis
      })
    }]
  }));
  return logger;
}

function createLoger(bunyanLogger) {
  const edgeNameSpaceInstance = require('continuation-local-storage').getNamespace('EDGE');
  for (var key in bunyanLogger) {
    var attribute = bunyanLogger[key];

    if (typeof attribute === 'function') {
      var originalMethod = attribute.bind(bunyanLogger);
      if (['trace', 'debug', 'info', 'warn', 'error', 'fatal'].indexOf(key) !== -1) {
        this[key] = decorateLogMethod(originalMethod, edgeNameSpaceInstance);
      } else if (key === 'child') {
        this[key] = decorateChildMethod(originalMethod);
      } else {
        this[key] = originalMethod;
      }
    } else {
      this[key] = attribute;
    }
  }
}

function decorateLogMethod(logMethod, edgeNameSpaceInstance) {
  return function () {
    var args = Array.prototype.slice.call(arguments); // clone
    args.unshift({
      requestId: edgeNameSpaceInstance.get('requestId')
    });
    return logMethod.apply(undefined, args);
  };
}

function decorateChildMethod(childCreator) {
  return function () {
    return new Logger(childCreator.apply(undefined, arguments));
  };
}

class Logger {
  getLogger() {
    return getLogger();
  }
}

const logger = new Logger();
const loggerInstance = logger.getLogger();

module.exports = {
  getLogger: loggerInstance,
  loggerContext: loggerContext
}