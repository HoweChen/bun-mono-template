import { log } from "./log";
import type { Context, Next } from 'hono';

export const LoggerMiddleware = async (c: Context, next: Next) => {
	log.info(`Request: ${c.req.method} ${c.req.url}`);
	const isPost = c.req.method === "POST";
	if (isPost) {
		const body = await c.req.text();
		log.info(`Request body: ${body}`);
	}
	await next();
	log.info(`Response: ${c.res.status}`);
	if (isPost) {
		const resBody = await await c.res.clone().text();
		log.info(`Response body: ${resBody}`);
	}
};
export const TimerMiddleware = async (c: Context, next: Next) => {
	const start = Date.now();
	await next();
	const end = Date.now();
	log.info(`Request took ${end - start}ms`);
};
