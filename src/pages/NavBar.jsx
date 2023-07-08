import styles from './NavBar.module.css';

export default function NavBar() {
	return (
		<div className={styles.navContainer}>
			<img src="/helper.svg" alt="Helper" className={styles.navLogo} />
			<div className={styles.navItemContainer}>
				<a href="/" className={styles.navItem}>
					Home
				</a>
				<a href="/mapping" className={styles.navItem}>
					Mapping
				</a>
				<a href="" className={styles.navItemComingSoon}>
					More Feature Coming Soon
				</a>
			</div>
		</div>
	);
}
