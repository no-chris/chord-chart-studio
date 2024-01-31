// Used to serve the `build` folder locally
const express = require('express');
const app = express();
const PORT = 9000;

const path = require('path');
const buildDir = path.resolve(__dirname, '../build');

app.use('/app', express.static(buildDir));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () =>
	console.log(
		`Server listening on port: ${PORT}\nhttp://localhost:${PORT}/app/index.html`
	)
);
