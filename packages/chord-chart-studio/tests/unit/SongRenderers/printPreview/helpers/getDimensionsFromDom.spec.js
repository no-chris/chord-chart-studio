import React from 'react';

import '@testing-library/jest-dom';

import getDimensionsFromDom from '../../../../../src/songRenderers/printPreview/helpers/getDimensionsFromDom';

describe('getDimensionsFromDom', () => {
	function TestComponent() {
		return <div className={'myTestComponent'}>testComponent</div>;
	}

	test('should resolve with the return value of the measuring function', () => {
		expect.assertions(3);

		const getDimensions = jest.fn();
		getDimensions.mockReturnValue({ width: 247, height: 233 });

		return getDimensionsFromDom(<TestComponent />, getDimensions)
			.then(({ height, width }) => {
				expect(height).toBe(233);
				expect(width).toBe(247);
			})
			.then(() => {
				expect(getDimensions).toHaveBeenCalledTimes(1);
			});
	});

	test('should pass the Element container to the measuring function', () => {
		expect.assertions(2);

		const getDimensions = jest.fn();
		getDimensions.mockImplementation((container) => {
			expect(container).toBeInstanceOf(Element);
			expect(container.firstChild.innerHTML).toBe(
				'<div class="myTestComponent">testComponent</div>'
			);
		});

		return getDimensionsFromDom(<TestComponent />, getDimensions);
	});

	test('should wrap the component in a div with the "measuring-node" class', () => {
		expect.assertions(1);

		const getDimensions = jest.fn();
		getDimensions.mockImplementation((container) => {
			expect(container).toHaveClass('measuring-node');
		});

		return getDimensionsFromDom(<TestComponent />, getDimensions);
	});

	test('should remove the component from the DOM once measuring function is called', () => {
		expect.assertions(2);

		const getDimensions = jest.fn();
		getDimensions.mockImplementation(() => {
			const testComponent = document.querySelector('.myTestComponent');
			expect(testComponent).toBeInstanceOf(Element);
		});

		return getDimensionsFromDom(<TestComponent />, getDimensions).then(
			() => {
				const testComponent =
					document.querySelector('.myTestComponent');
				expect(testComponent).toBeNull();
			}
		);
	});
});
