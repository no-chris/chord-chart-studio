import styles from './Button.module.css';
import { Button as ReactAriaButton } from 'react-aria-components';

import React from 'react';

const defaultType = 'primary';

export default function Button({ children, type = defaultType, onPress }) {
	const className = [
		styles.button,
		styles[type] ? styles[type] : styles[defaultType],
	];

	return (
		<ReactAriaButton onPress={onPress} className={className.join(' ')}>
			{children}
		</ReactAriaButton>
	);
}
