import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.homeTitleDesc}>
					<p className={styles.kicker}>For health workers</p>
					<h1 className={styles.homeTitle}>Lab notes, ready to paste.</h1>
					<p className={styles.homeDescription}>
						A small notebook for nurses, doctors, and anyone else on the ward. Write up the labs
						that were ordered, or work out a dose from the patient’s weight.
					</p>
					<div className={styles.actions}>
						<button
							className={styles.homeButton}
							onClick={() => {
								navigate('/mapping');
							}}>
							Write a lab note
						</button>
						<button
							className={styles.homeButton}
							onClick={() => {
								navigate('/dose');
							}}>
							Calculate a dose
						</button>
					</div>
				</div>
				<div className={styles.markWrap} aria-hidden="true">
					<img src="/mark.svg" alt="" className={styles.logo} />
				</div>
			</div>
		</div>
	);
}
