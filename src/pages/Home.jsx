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
						Lab Helper is a small notebook for nurses, doctors, and anyone else writing up labs.
						Enter the numbers, keep only the tests that were ordered, then copy one clean note into
						the chart.
					</p>
					<button
						className={styles.homeButton}
						onClick={() => {
							navigate('/mapping');
						}}>
						Start mapping
					</button>
				</div>
				<div className={styles.markWrap} aria-hidden="true">
					<img src="/mark.svg" alt="" className={styles.logo} />
				</div>
			</div>
		</div>
	);
}
