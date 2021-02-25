/**
 * @author Deniz Ugur <deniz343@gmail.com>
 */
import server from "./core/server";

//* CONSTANTS
const PORT = process.env.PORT || 5000;

//* App Start
import sequelize from "../../db";
import routerApi from "./core/api";
import checkJwt from "./core/auth";

server.use("/api", [checkJwt, routerApi]);

server.get("/", (req, res) => {
	res.send("Hello");
});

server.use((err: Error, req: any, res: any, next: any) => {
	console.error(err);
	return res.status(500).json({
		code: "INTERNAL_ERROR",
		msg: err,
	});
});

sequelize
	.sync({ force: process.env.NODE_ENV != "production" })
	.then(async () => {
		server.listen(PORT, () => console.log(`Listening on ${PORT}`));
	});
