import React from "react";
import styles from "./First.module.scss"

export default function First() {
	return <div>
		
		<div>

			<div className={styles.root}>

				<h2>Mikro Şebeke Simülasyonu</h2>

				<form action="">

					<div className={styles.row}>
						<label htmlFor="trafo-boyutu" className={styles.column}>Trafo Boyutu</label>
						<input type="number" id="trafo-boyutu" className={styles.column}/>
					</div>

					<div className={styles.row}>
						<label htmlFor="DoD" className={styles.column}>DoD</label>
						<input type="number" id="Dod" className={styles.column}/>
					</div>

					<div className={styles.row}>
						<label htmlFor="tuketim-verisi" className={styles.column}>Tüketim Verisi</label>
						<input type="file" id="tuketim-verisi" className={styles.column}/>
					</div>

					<button className={styles.button}>Başlat</button>

				</form>
			</div>
		</div>
	</div>;
}
