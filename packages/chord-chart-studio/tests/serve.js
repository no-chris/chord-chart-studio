// Used to serve the `build` folder locally, mainly to check the service worker behavior
const express = require('express');
const app = express();
const PORT = 9000;

const path = require('path');
const buildDir = path.resolve(__dirname, '../build');

app.use(express.static(buildDir));

app.listen(PORT, () =>
	console.log(`Server listening at http://localhost:${PORT}`)
);
