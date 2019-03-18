/**
 * @example
 * import logFactory from  './core/logger';
 * const log = logFactory.getLogger('main');
 * log.info('info test');
 *
 */
import * as logLevel from 'loglevel';

logLevel.setDefaultLevel('info');

export default {
	getLogger(name) {
		return logLevel.getLogger(name);
	}
};