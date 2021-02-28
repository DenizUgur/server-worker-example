import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { App } from "./containers/";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.scss";
import "antd/dist/antd.css";

const Auth0ProviderWithHistory = ({ children }: any) => {
	const history = useHistory();
	const options: any = {
		domain: process.env.REACT_APP_AUTH0_DOMAIN,
		clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
		audience: process.env.REACT_APP_AUTH0_AUDIENCE,
	};

	if (Object.values(options).some((val) => val === null)) {
		throw new Error("Some options are not defined!");
	}

	const onRedirectCallback = (appState: any) => {
		history.push(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={options.domain}
			clientId={options.clientId}
			redirectUri={`${window.location.origin}/dashboard`}
			onRedirectCallback={onRedirectCallback}
			audience={options.audience}
		>
			{children}
		</Auth0Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithHistory>
				<App />
			</Auth0ProviderWithHistory>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
