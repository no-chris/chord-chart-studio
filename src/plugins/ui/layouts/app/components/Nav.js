import React from 'react';

import NavEntry from './NavEntry.js';

export default function Nav(props) {
	const { active } = props;

	const allEntries = [
		{
			id: 'edit',
			text: 'Edit',
			icon: 'create',
			link: '/edit',
		},
		{
			id: 'play',
			text: 'Play',
			icon: 'music_note',
			link: '/play',
		},
		{
			id: 'print',
			text: 'Print',
			icon: 'print',
			link: '/print',
		},
		{
			id: 'export',
			text: 'Export',
			icon: 'save_alt',
			link: '/export',
		},
	];

	return (
		<nav className="main-nav">
			<ul>
				{
					allEntries.map((entry, key) =>
						<NavEntry
							key={key}
							isActive={(entry.id === active)}
							{...entry}
						/>
					)
				}
			</ul>
		</nav>
	);
}
