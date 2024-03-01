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
			control: 'select',
			options: ['Primary', 'Secondary'],
		},
	},
	args: { children: 'myButton', onClick: fn() },
};

export const Main = {};

export const SecondState = {
	args: {
		children: 'mySecondButton',
	},
};
