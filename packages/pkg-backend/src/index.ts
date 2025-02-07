import {TimerMiddleware, LoggerMiddleware} from "pkg-common/src/honoUtil";
import { Hono } from "hono";

const app = new Hono();
app.use(TimerMiddleware);
app.use(LoggerMiddleware);

app.get("/", (c) => {
	// log.info("Hello Hono!");
	return c.text("Hello Hono!");
});

app.post("/api", async (c) => {
	const body = await c.req.json();
	return c.json({ message: "Received", data: body });
});

export default app;
