import './Nav.scss';

import React from 'react';
import PropTypes from 'prop-types';

import NavEntry from './NavEntry.js';

function Nav(props) {
	const {
		active,
		allEntries,
	} = props;

	return (
		<nav className={'mainNav'}>
			<ul className={'mainNav-entries'}>
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

Nav.propTypes = {
	active: PropTypes.string.isRequired,
	allEntries: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
		})
	),
};

export default React.memo(Nav);
