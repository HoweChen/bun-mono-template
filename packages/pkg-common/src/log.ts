import pino from 'pino';

export const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            colorize: true,
            ignore: 'pid,hostname',
        },
    },
});