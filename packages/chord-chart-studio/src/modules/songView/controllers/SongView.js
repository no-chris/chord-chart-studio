import React from 'react';
import { useSelector } from 'react-redux';

import { navigateTo, getLink } from '../../../core/router';
import { getOne } from '../../../db/files/selectors';

export default function SongView({ songId }) {
	const song = useSelector((state) => getOne(state, songId));

	const handleClick = (e) => {
		e.preventDefault();
		navigateTo(getLink('library'));
	};

	return (
		<div>
			<a href="" onClick={handleClick}>
				Go back to list
			</a>
			<br />
			<b>{song.title}</b>
			<p>{song.content}</p>
		</div>
	);
}
