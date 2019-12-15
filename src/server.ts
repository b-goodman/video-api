import dotenv from "dotenv";
import http from "http";
import io from "socket.io";
import express from "express";
import { applyMiddleware, applyRoutes, applySockets } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import sockets from "./sockets";
import { connectDb } from "./models/index";

dotenv.config();

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes as any, router);
applyMiddleware(errorHandlers, router);

const PORT = process.env.SERVER_PORT;
const server = http.createServer(router);

const socketServer = io().attach(server);
applySockets(sockets, socketServer);

connectDb().then( async () => {
    server.listen(PORT, () =>
        console.log(`Server is running http://localhost:${PORT}...`)
    );
})