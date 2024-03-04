import styles from './Button.module.css';

import React from 'react';

export default function Button({ children, onClick }) {
	return (
		<div className={styles.button} onClick={onClick}>
			<div className={styles.buttonContent}>{children}</div>
		</div>
	);
}
