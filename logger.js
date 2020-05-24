const { createLogger, format, transports } = require('winston');

const logger = createLogger({
// module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'send-mail' },
  transports: [
    // - Write to all logs with level `info` and below to `send-mail-combined.log`.
    // - Write all logs error (and below) to `send-mail-error.log`.
    new transports.File({ filename: 'send-mail-error.log', level: 'error' }),
    new transports.File({ filename: 'send-mail-combined.log' })
  ]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;
// exports.logger = logger;
