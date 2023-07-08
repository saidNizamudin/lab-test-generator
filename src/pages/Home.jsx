import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.homeTitleDesc}>
					<span className={styles.homeTitle}>
						Welcome to <strong>KOAS HELPER</strong>
					</span>
					<span className={styles.homeDescription}>
						Your ultimate companion for medical students at RSUD Zainoel Abidin Aceh! Designed
						specifically to streamline your workflow, KOAS HELPER is a comprehensive tool that
						empowers you to map patients' lab test results effortlessly. But that's not all! We're
						continuously working on adding exciting new features
					</span>
					<button
						className={styles.homeButton}
						onClick={() => {
							navigate('/mapping');
						}}>
						Mapping
					</button>
				</div>
				<img src="/logo.jpg" alt="" className={styles.logo} />
			</div>
		</div>
	);
}
