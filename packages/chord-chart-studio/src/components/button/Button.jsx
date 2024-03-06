import styles from './Button.module.css';
import { Button as ReactAriaButton } from 'react-aria-components';

import React from 'react';

export default function Button({ children, type = 'primary', onPress }) {
	const className = [
		styles.button,
		styles[type] ? styles[type] : styles.primary,
	];

	return (
		<ReactAriaButton onPress={onPress} className={className.join(' ')}>
			{children}
		</ReactAriaButton>
	);
}
