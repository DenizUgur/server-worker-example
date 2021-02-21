import React from "react";
import styles from "./AppBar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTasks,
	faPlusSquare,
	faCog,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useRouteMatch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppBar() {
	const { url } = useRouteMatch();
	const { user } = useAuth0();

	return (
		<div className={styles.Root}>
			<div className={styles.User}>
				<img src={user.picture} alt={user.name} />
				<div>
					<span>{user.name}</span>
					<span>{user.email}</span>
				</div>
			</div>
			<Link to={`${url}/jobs`} className={styles.Primary}>
				<FontAwesomeIcon icon={faTasks} size="2x" />
				<span>Jobs</span>
			</Link>
			<Link to={`${url}/new`} className={styles.Primary}>
				<FontAwesomeIcon icon={faPlusSquare} size="2x" color="green" />
				<span>New</span>
			</Link>
			<Link to={`${url}/settings`} className={styles.Primary}>
				<FontAwesomeIcon icon={faCog} size="2x" />
				<span>Settings</span>
			</Link>
			<div style={{ flexGrow: 1 }} />
		</div>
	);
}
