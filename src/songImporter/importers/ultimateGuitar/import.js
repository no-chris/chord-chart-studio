import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function importFromUltimateGuitar(importUrl) {
	console.log('fetching...', importUrl);
	return axios.get(importUrl)
		.then((response) => {
			console.log('done with success!');
			return response.text();
		}).then((html) => {
			console.log('and now in html');
			console.log(html);
			return html;
		}).catch((err) => {
			console.log('arrrg', err);
			return err;
		});
}
