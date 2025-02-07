import { Elysia } from "elysia";
import {log} from "pkg-common/src/log";

const app = new Elysia()
  // Basic GET endpoint
  .get("/", () => "Hello Elysia")
  
  // GET endpoint with path parameter
  .get("/users/:id", ({ params: { id } }) => {
    return { userId: id, message: `Fetching user with id ${id}` };
  })
  
  // POST endpoint for creating resources
  .post("/users", ({ body }) => {
    return { 
      message: "User created",
      data: body 
    };
  })
  
  // PUT endpoint for updating resources
  .put("/users/:id", ({ params: { id }, body }) => {
    return { 
      message: `User ${id} updated`,
      data: body 
    };
  })
  
  // DELETE endpoint
  .delete("/users/:id", ({ params: { id } }) => {
    return { 
      message: `User ${id} deleted` 
    };
  })
  
  // GET endpoint with query parameters
  .get("/search", ({ query }) => {
    return {
      message: "Search results",
      query: query
    };
  })

  .listen(3000);
log.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
