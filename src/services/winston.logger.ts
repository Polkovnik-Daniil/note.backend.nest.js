import 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { LoggerService } from '@nestjs/common';

export const logger: LoggerService = WinstonModule.createLogger({
  transports: [
    // file on daily rotation (error only)
    new transports.DailyRotateFile({
      dirname: 'dist/src/log',
      // %DATE will be replaced by the current date
      filename: `logs/%DATE%-error.log`,
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false, // don't want to zip our logs
      maxFiles: '30d', // will keep log until they are older than 30 days
    }),
    // same for all levels
    new transports.DailyRotateFile({
      dirname: 'dist/src/log',
      filename: `logs/%DATE%-combined.log`,
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.Console({
      level: 'silly',
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp(),
        format.errors({stack: true}),
        format.printf((info) => {
          return `[${info.timestamp}] - [${info.level}] - [${info.message}]`;
        }),
      ),
    }),
  ],
});
