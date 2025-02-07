import { Elysia } from "elysia";
import {log} from "pkg-common/src/log";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

log.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
