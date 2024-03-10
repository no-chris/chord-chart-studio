import React from 'react';

import { Button as ReactAriaButton } from 'react-aria-components';
import styles from './Button.module.css';

import Icon from '../icon/Icon';

const defaultType = 'primary';

export default function Button({
	children,
	type = defaultType,
	icon = '',
	onPress,
}) {
	const className = [
		styles.button,
		styles[type] ? styles[type] : styles[defaultType],
	];

	const renderedIcon = icon ? (
		<span className={styles.icon}>
			<Icon id={icon} size={20} />
		</span>
	) : (
		''
	);

	return (
		<ReactAriaButton onPress={onPress} className={className.join(' ')}>
			{renderedIcon}
			<span className={styles.label}>{children}</span>
		</ReactAriaButton>
	);
}
