/**
 * @author Deniz Ugur <deniz343@gmail.com>
 */
//* Necessary imports
import express from "express";
import helmet from "helmet";
import cors from "cors";
import redis from "redis";
import { resolve } from "path";

import cookieParser from "cookie-parser";
import session from "express-session";

const dev = process.env.NODE_ENV !== "production";

//* APP
const app = express();
app.set("trust proxy", 1);
app.use("/static", express.static(resolve("../../frontend/build/static")));

//* Basic protection
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
	cors({
		origin: dev ? "*" : "https://battery-sizing-program.herokuapp.com/",
		credentials: true,
		allowedHeaders: "Content-Type, Set-Cookie, Authorization",
	})
);

//* Reqeust parsing
app.use(cookieParser());

//* Manage Session
if (dev) {
	app.use(
		session({
			secret: process.env.SESSION_KEY || "",
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: false,
				sameSite: "lax",
			},
		})
	);
} else {
	const RedisStore = require("connect-redis")(session);
	const redisClient = redis.createClient(process.env.REDIS_URL || "");
	app.use(
		session({
			store: new RedisStore({ client: redisClient, ttl: 1000 * 60 * 15 }),
			secret: process.env.SESSION_KEY || "",
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: true,
				sameSite: "lax",
			},
		})
	);
}

export default app;
