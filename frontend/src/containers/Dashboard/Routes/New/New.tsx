import React, { useState } from "react";
import styles from "./New.module.scss";

import { Steps, Button } from "antd";
import { First, Second } from "./Steps";

const { Step } = Steps;

export default function New() {
	const [state, setState] = useState(0);

	return (
		<div className={styles.Root}>
			<div className={styles.Steps}>
				<Steps current={state}>
					<Step
						title="Finished"
						description="This is a description."
					/>
					<Step
						title="In Progress"
						subTitle="Left 00:00:08"
						description="This is a description."
					/>
					<Step
						title="Waiting"
						description="This is a description."
					/>
				</Steps>
			</div>
			<div className={styles.Stage}>
				{state === 0 && <First />}
				{state === 1 && <Second />}
			</div>
			<div className={styles.Nav}>
				<i>All changes are saved</i>
				<Button onClick={() => setState(0)}>Previous</Button>
				<Button type="primary" onClick={() => setState(1)}>
					Next
				</Button>
			</div>
		</div>
	);
}
