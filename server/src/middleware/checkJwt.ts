// src/middleware/checkJwt.ts
import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
	userId: number;
	email: string;
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = <string>req.headers.authorization;
	let jwtPayload: JwtPayload;

	try {
		jwtPayload = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET ?? "");
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		res.status(401).send("Unauthorized");
		return;
	}

	const { userId, email } = jwtPayload;
	const newToken = jwt.sign({ userId, email }, process.env.JWT_SECRET ?? "", {
		expiresIn: "1h",
	});
	res.setHeader("token", newToken);
	next();
};
