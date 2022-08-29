// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { googleApi } from "./routes/googleApi";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("googleApi.", googleApi)

// export type definition of API
export type AppRouter = typeof appRouter;
