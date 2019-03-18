import _ from 'lodash';

/**
 * @param areas - key/value pairs where key = areaId and value = cssSelector
 */
export default function areaBrokerFactory(areas) {

	const areaBroker = {};

	let getterName;

	_.forEach(areas,  (cssSelector, areaId) => {
		getterName = 'get' + areaId.charAt(0).toUpperCase() + areaId.slice(1);

		areaBroker[getterName] = () => {
			const area = document.querySelectorAll(cssSelector);

			if (area.length === 0) {
				throw new Error('Cannot find area: ' + areaId + ' with selector: ' + cssSelector);

			} else if (area.length > 1) {
				throw new Error('Multiple areas: ' + areaId + ' found with selector: ' + cssSelector);
			}
			return area.item(0);
		};
	});

	return areaBroker;
}