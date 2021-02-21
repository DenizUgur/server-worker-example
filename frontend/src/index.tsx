import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containers/";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth } from "./config/auth";

import "./index.scss";
import "antd/dist/antd.css";

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={auth.domain}
			clientId={auth.client_id}
			redirectUri={`${window.location.origin}/dashboard`}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
