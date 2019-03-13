import * as logLevel from 'loglevel';

logLevel.setDefaultLevel('info');

export default {
	getLogger(name) {
		return logLevel.getLogger(name);
	}
};