import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const links = [
	{ to: '/', label: 'Home', end: true },
	{ to: '/mapping', label: 'Mapping' },
	{ to: '/dose', label: 'Dosis' },
];

export default function NavBar() {
	return (
		<header className={styles.navContainer}>
			<NavLink to="/" className={styles.brand} end>
				<img src="/mark.svg" alt="" className={styles.navLogo} />
				<span className={styles.brandName}>Lab Helper</span>
			</NavLink>
			<nav className={styles.navItemContainer}>
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						end={link.end}
						className={({ isActive }) =>
							isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
						}>
						{link.label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}
