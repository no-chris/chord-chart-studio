import styles from './Button.module.css';
import { Button as ReactAriaButton } from 'react-aria-components';

import React from 'react';

export default function Button({ children, onPress }) {
	return <ReactAriaButton onPress={onPress}>{children}</ReactAriaButton>;
}
