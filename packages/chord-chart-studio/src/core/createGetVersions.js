/* eslint-env node */
const packageJson = require('../../package.json');
const cmPackageJson = require('../../node_modules/chord-mark/package.json');
const fs = require('fs');

const chordChartStudioVersion = packageJson.version;
const chordMarkVersion = packageJson.dependencies['chord-mark'].replace(
	'^',
	''
);
const chordSymbolVersion = cmPackageJson.dependencies['chord-symbol'].replace(
	'^',
	''
);

const version = {
	'chord-chart-studio': 'v' + chordChartStudioVersion,
	'chord-symbol': 'v' + chordSymbolVersion,
	'chord-mark': 'v' + chordMarkVersion,
};

const serialized = JSON.stringify(version).replace(/"/g, "'");

const fileContent = `export default () => (${serialized});`;

fs.writeFileSync(__dirname + '/getVersions.js', fileContent);
