import React from 'react';
import { useSelector } from 'react-redux';

import { getAllTitles } from '../../../db/files/selectors';
import { navigateTo } from '../../../core/router';

export default function Library() {
	const allTitles = useSelector(getAllTitles);

	const allrenderedTitles = allTitles.map((song) => (
		<SongEntry key={song.id} song={song} />
	));

	return (
		<div>
			Full Library
			<ul>{allrenderedTitles}</ul>
		</div>
	);
}

const SongEntry = ({ song }) => {
	const handleClick = (e) => {
		e.preventDefault();
		console.log('going to', `/songView/${song.id}`);
		navigateTo(`/songView/${song.id}`);
	};
	return (
		<li>
			<a href={`/song/${song.id}`} onClick={handleClick}>
				{song.title}
			</a>
		</li>
	);
};
