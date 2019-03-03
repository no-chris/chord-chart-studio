import _ from 'lodash';

export default function isRenderer(renderer) {
	if (!_.isFunction(renderer.render)) {
		throw new TypeError('Given renderer does not contain a .render() method');
	}
	return true;
}