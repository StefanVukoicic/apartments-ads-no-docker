import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { prisma } from "./db/client";
// import { scraper } from "./script";

const appRouter = trpc.router().query("database", {
  async resolve() {
    // const rowNumber = await prisma.apartment_ads.count();
    // if (!rowNumber) {
    //   await scraper();
    // }
    const allAds = await prisma.apartment_ads.findMany();
    return allAds;
  },
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
