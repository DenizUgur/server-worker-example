import express from "express";
import Queue from "bull";
import { Router } from "express";
import { Job } from "../../../db";
import { nanoid } from "nanoid";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const workQueue = new Queue("work", REDIS_URL);

const router = Router();
router.use(express.json());

router.post("/new", async (req, res) => {
	const id = nanoid();

	await Job.create({
		userId: req.user.sub,
		jobId: id,
		inputData: req.body,
	});
	await workQueue.add({ owner: req.body.sub }, { jobId: id });

	return res.json({ id });
});

router.post("/status", async (req, res) => {
	return res.json(await checkJob(req.body.id, req.user.sub));
});

router.post("/get", async (req, res) => {
	const status = await checkJob(req.body.id, req.user.sub);

	if (status.error) return res.json(status);

	if (status.state !== "completed")
		return res.json({
			error: "This job hasn't completed yet",
		});

	const job = await Job.findOne({
		where: {
			jobId: req.body.id,
		},
	});

	if (!job)
		return res.json({
			error: "No matching job found",
		});

	return res.json(job.getDataValue("outputData"));
});

router.post("/list", async (req, res) => {
	const jobs = await Job.findAll({
		where: {
			userId: req.user.sub,
		},
		attributes: ["jobId", "state", "inputData"],
	});

	return res.json(jobs);
});

const checkJob = async (id: string, requester: string) => {
	const job = await workQueue.getJob(id);

	if (!job)
		return {
			error: "No matching job found",
		};

	if (job.data.owner !== requester)
		return {
			error: "You are not the owner of this job",
		};

	return {
		state: await job.getState(),
	};
};

export default router;
