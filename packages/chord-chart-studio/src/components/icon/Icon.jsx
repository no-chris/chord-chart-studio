import React from 'react';
import { Plus, Import } from 'lucide-react';

export default function Icon({ id, size }) {
	let Component;

	switch (id) {
		case 'plus':
			Component = Plus;
			break;
		case 'import':
			Component = Import;
			break;
	}
	return <Component size={size} />;
}
