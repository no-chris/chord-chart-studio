import React from 'react';
import { useSelector } from 'react-redux';

import { getAllTitles } from '../../../db/files/selectors';
import { navigateTo, getLink } from '../../../core/router';
import Button from '../../../components/button/Button';

export default function Library() {
	const allTitles = useSelector(getAllTitles);

	const allrenderedTitles = allTitles.map((song) => (
		<SongEntry key={song.id} song={song} />
	));

	return (
		<div>
			Full Library
			<ul>{allrenderedTitles}</ul>
			<Button>My Nice Button</Button>
		</div>
	);
}

const SongEntry = ({ song }) => {
	const handleClick = (e) => {
		e.preventDefault();
		navigateTo(getLink('songView', { songId: song.id }));
	};
	return (
		<li>
			<a href={`/song/${song.id}`} onClick={handleClick}>
				{song.title}
			</a>
		</li>
	);
};
