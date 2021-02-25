import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: req?.user });
});

export default router;
