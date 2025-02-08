import { log } from "./log";
import type { Context, Next } from "hono";

export const LoggerMiddleware = async (
	c: Context,
	next: Next,
): Promise<void> => {
	log.info(`Request: ${c.req.method} ${c.req.url}`);
	const isPost: boolean = c.req.method === "POST";
	if (isPost) {
		const body: string = await c.req.text();
		log.info(`Request body: ${body}`);
	}
	await next();
	log.info(`Response: ${c.res.status}`);
	if (isPost) {
		const resBody: string = await await c.res.clone().text();
		log.info(`Response body: ${resBody}`);
	}
};
export const TimerMiddleware = async (
	c: Context,
	next: Next,
): Promise<void> => {
	const start: number = Date.now();
	await next();
	const end: number = Date.now();
	log.info(`Request took ${end - start}ms`);
};
