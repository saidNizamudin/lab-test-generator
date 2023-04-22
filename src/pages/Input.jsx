import React from 'react';
import styles from './Input.module.css';

export default function Input({ isText, onChange, label, value, name }) {
	return (
		<div key={name} className={styles.inputContainer}>
			<input
				type={isText ? 'text' : 'text'}
				name={name}
				onChange={onChange}
				value={value}
				className={styles.input}
				placeholder={label}
			/>
		</div>
	);
}
