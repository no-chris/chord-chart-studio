import React from 'react';

const SongView = ({ songId, printMode = false }) => {
	return (
		<>
			<h1>my gift is my song with id {songId}</h1>
			<p>printMode is {printMode}</p>
		</>
	);
};

export default SongView;
