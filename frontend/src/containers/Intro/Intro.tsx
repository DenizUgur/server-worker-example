import React from "react";
import styles from "./Intro.module.scss";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className={styles.root}>
			<div className={styles.welcome}>
				<h1>Batarya.</h1>
				
				<p>
					<b>
					Özyeğin Üniversitesi 
					</b>
				</p>
				<p>
					Şebeke Planlama ve Operasyon Laboratuvarı
				</p>
				<p>
					Mikro-Şebeke ve Müstakil Batarya Analizi
				</p>
			</div>
			<div className={styles.button_group}>
				<button className={styles.demo}>Örnek Analiz</button>
				<div className={styles.signup}>
					<button onClick={() => loginWithRedirect()}>Giriş Yap</button>
					<span>
						ya da <strong>Kayıt Ol</strong>
					</span>
				</div>
			</div>
			<footer>Tüm Hakları Saklıdır &copy; 2021 Emin Kartcı - Göktürk Poyrazoğlu - Deniz Uğur</footer>
		</div>
	);
}

export default App;
