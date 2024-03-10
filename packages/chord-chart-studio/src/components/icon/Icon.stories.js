import Icon from './Icon';

export default {
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		id: {
			control: 'select',
			options: ['plus', 'import'],
		},
	},
	args: {},
};

export const Plus = {
	args: { id: 'plus' },
};

export const Import = {
	args: { id: 'import' },
};
