import path from "path";
import dotenv from "dotenv";
import express from "express";
import process from "process";
import nnnRouter from "./config/nnn-router.js";
import promiseRouter from "express-promise-router";
import authHandler from "./middleware/auth-handler.js";

dotenv.config();

const app = express();

const nnnRouterOptions = {
  routeDir: "/routes",
  baseRouter: promiseRouter(),
};

app.use("*", authHandler);

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  nnnRouter(nnnRouterOptions)
);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port: ${server.address().port}`);
});
