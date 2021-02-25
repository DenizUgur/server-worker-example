import throng from "throng";
import Queue from "bull";
import { spawn } from "child_process";
import fs from "fs";

// Connect to a local redis instance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const workers = process.env.WEB_CONCURRENCY || 2;
const maxJobsPerWorker = 50;

function start() {
	// Connect to the named work queue
	let workQueue = new Queue("work", REDIS_URL);

	console.log("Starting worker...");

	workQueue.process(maxJobsPerWorker, async (job: any) => {
		console.log("Started on " + job.id);
		console.log(job.data);

		try {
			return { done: "yes" };
		} catch (error) {
			console.error(error);
			throw error;
		}
	});
}

throng({ workers, start });
