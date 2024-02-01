import SongView from './controllers/SongView';

export default [
	{
		name: 'songView',
		path: '/songView/:songId',
		action: SongView,
	},
];
