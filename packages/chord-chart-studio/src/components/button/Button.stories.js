import { fn } from '@storybook/test';

import Button from './Button';

export default {
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
		},
		type: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary'],
		},
		icon: {
			control: 'select',
			options: ['plus', 'import'],
		},
	},
	args: { children: 'myButton', onPress: fn() },
};

export const Primary = {
	args: {
		children: 'Primary',
	},
};

export const Secondary = {
	args: {
		children: 'Secondary',
		type: 'secondary',
	},
};

export const Tertiary = {
	args: {
		children: 'Tertiary',
		type: 'tertiary',
	},
};
