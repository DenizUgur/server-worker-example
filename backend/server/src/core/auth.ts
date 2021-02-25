/**
 * @author Deniz Ugur <deniz343@gmail.com>
 */
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const options: any = {
	domain: process.env.AUTH0_DOMAIN,
	audience: process.env.AUTH0_AUDIENCE,
};

if (Object.values(options).some((val) => val === null)) {
	throw new Error("Some options are not defined!");
}

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${options.domain}/.well-known/jwks.json`,
	}),

	audience: options.audience,
	issuer: `https://${options.domain}/`,
	algorithms: ["RS256"],
});

export default checkJwt;
