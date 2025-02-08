import { Hono } from "hono";
import type { User } from "pkg-common/src/dto/user";
import { LoggerMiddleware, TimerMiddleware } from "pkg-common/src/honoUtil";

const app = new Hono();
app.use(TimerMiddleware);
app.use(LoggerMiddleware);

app.get("/", (c) => {
	// log.info("Hello Hono!");
	return c.text("Hello Hono!");
});

app.get("/user", (c) => {
	const user: User = {
		id: "123",
		name: "John Doe",
		age: 30,
		email: "haha@gmail.com",
		address: {
			street: "123 Main St",
			city: "Springfield",
			zip: "12345",
		},
	};
	return c.json(user);
});

app.post("/api", async (c) => {
	const body = await c.req.json();
	return c.json({ message: "Received", data: body });
});

export default app;
