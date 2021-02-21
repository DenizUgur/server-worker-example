import React from "react";
import styles from "./Intro.module.scss";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className={styles.root}>
			<div className={styles.welcome}>
				<h1>Battery.</h1>
				<p>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book.
				</p>
			</div>
			<div className={styles.button_group}>
				<button className={styles.demo}>See a demo</button>
				<div className={styles.signup}>
					<button onClick={() => loginWithRedirect()}>Sign Up</button>
					<span>
						or <strong>login</strong>
					</span>
				</div>
			</div>
			<footer>Copyright &copy; 2021</footer>
		</div>
	);
}

export default App;
