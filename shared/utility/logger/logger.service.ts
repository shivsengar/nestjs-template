import { join } from 'path';
import * as winston from 'winston';
import  'winston-daily-rotate-file';
import { LogLevel } from './loglevel.util';
export class LoggerService {
    private logger: winston.Logger;

    constructor(private context: string) {
        const consoleFormat = winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf((info) => `${info.timestamp} [${info.level}] [${info.context}] : ${info.message}`),
        );
        const transport = new winston.transports.DailyRotateFile({
            filename: '#{logs}#/dms/dms-%Date%.log',
            datePattern: 'YYYY-MM-DD-HH-MM'
        });
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.json(),
            ),
            defaultMeta: { microservice: 'DMS' },
            transports: [
                transport,
                new winston.transports.Console({
                    format: consoleFormat,
                    level: 'debug'
                }),
                new winston.transports.File({
                    dirname: join(__dirname, '../../log'),
                    filename: 'dev/log',
                    level: 'debug',
                    //  maxsize:500 //Defines max size of log file in bytes
                })
            ]
        })
    }

    log(...message: any) {
        let finalMessage = '';
        for (let i = 0; i < message.length; i++) {
            if (LogLevel.level === 'info' || LogLevel.level === 'all') {
                if (typeof message[i] === 'object') {
                    try {
                        message[i] = JSON.stringify(message[i]);
                    } catch (e) {
                        console.log(message[i]);
                    }
                }
            }
            finalMessage += message[i];
        }
        const currentDate = new Date();
        this.logger.info(finalMessage, {
            timestamp: currentDate.toISOString(),
            context: this.context
        });
    }
    debug(...message: any) {
        let finalMessage = '';
        for (let i = 0; i < message.length; i++) {
            if (LogLevel.level === 'debug' || LogLevel.level === 'all') {
                if (typeof message[i] === 'object') {
                    try {
                        message[i] = JSON.stringify(message[i]);
                    } catch (e) {
                        console.log(message[i]);
                    }
                }
            }
            finalMessage += message[i];
        }
        const currentDate = new Date();
        this.logger.debug(finalMessage, {
            timestamp: currentDate.toISOString(),
            context: this.context
        });
    }

    warn(...message: any) {
        let finalMessage = '';
        for (let i = 0; i < message.length; i++) {
            if (LogLevel.level === 'warn' || LogLevel.level === 'all') {
                if (typeof message[i] === 'object') {
                    try {
                        message[i] = JSON.stringify(message[i]);
                    } catch (e) {
                        console.log(message[i]);
                    }
                }
            }
            finalMessage += message[i];
        }
        const currentDate = new Date();
        this.logger.warn(finalMessage, {
            timestamp: currentDate.toISOString(),
            context: this.context
        });
    }

    verbose(...message: any) {
        let finalMessage = '';
        for (let i = 0; i < message.length; i++) {
            if (LogLevel.level === 'debug' || LogLevel.level === 'all') {
                if (typeof message[i] === 'object') {
                    try {
                        message[i] = JSON.stringify(message[i]);
                    } catch (e) {
                        console.log(message[i]);
                    }
                }
            }
            finalMessage += message[i];
        }
        const currentDate = new Date();
        this.logger.verbose(finalMessage, {
            timestamp: currentDate.toISOString(),
            context: this.context
        });
    }

    error(message: string, trace?: any) {
        if (LogLevel.level === 'error' || LogLevel.level === 'all') {
            const currentDate = new Date();
            try {
                trace = JSON.stringify(trace);
            } catch (e) {
                console.log(trace);
            }
            this.logger.error(`${message} -> (${trace || 'trace not provided'})`, {
                timestamp: currentDate.toISOString(),
                context: this.context
            });
        }
    }
}