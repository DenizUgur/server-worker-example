import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { Intro, Dashboard } from "../";

import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading && window.location.pathname !== "/") {
		return <div>Loading ...</div>;
	}

	return (
		<Router>
			<Switch>
				<Route path="/dashboard">
					{isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
				</Route>
				<Route path="/">
					<Intro />
				</Route>
			</Switch>
		</Router>
	);
}
