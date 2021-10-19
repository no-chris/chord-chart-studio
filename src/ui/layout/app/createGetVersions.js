/* eslint-env node */
const packageJson = require('../../../../package.json');
const cmPackageJson = require('../../../../node_modules/chord-mark/package.json');
const fs = require('fs');

const chordChartsStudioVersion = 'v' + packageJson.version;
const chordMarkVersion = packageJson.dependencies['chord-mark'].replace(
	'^',
	'v'
);
const chordSymbolVersion = cmPackageJson.dependencies['chord-symbol'].replace(
	'^',
	'v'
);

const version = {
	'chord-charts-studio': chordChartsStudioVersion,
	'chord-symbol': chordSymbolVersion,
	'chord-mark': chordMarkVersion,
};

const serialized = JSON.stringify(version).replace(/"/g, "'");

const fileContent = `export default () => (${serialized});`;

fs.writeFileSync(__dirname + '/getVersions.js', fileContent);
