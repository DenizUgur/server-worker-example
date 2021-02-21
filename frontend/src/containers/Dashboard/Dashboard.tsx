import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import styles from "./Dashboard.module.scss";

import { AppBar } from "../../components";
import { Jobs, New } from "./Routes";

export default function Dashboard() {
	const { path } = useRouteMatch();
	return (
		<div className={styles.Root}>
			<div className={styles.Container}>
				<Switch>
					<Route path={`${path}/jobs`}>
						<Jobs />
					</Route>
					<Route path={`${path}/new`}>
						<New />
					</Route>
					<Route path={`${path}/settings`}>Settings</Route>
					<Route path={path}>
						<Redirect to={`${path}/jobs`} />
					</Route>
				</Switch>
			</div>
			<AppBar />
		</div>
	);
}
