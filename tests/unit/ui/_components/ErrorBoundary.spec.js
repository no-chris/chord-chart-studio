import React from 'react';

import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import ErrorBoundary from '../../../../src/ui/_components/ErrorBoundary';

afterEach(cleanup);

describe('ErrorBoundary', () => {

	test('Should render the error in case of an error in a child component', () => {
		function Throw() {
			throw new Error('This is bad');
		}

		// Don't do this at home!! Prevent the thrown error to be output in the console
		/* eslint-disable no-console */
		const consoleLogError = console.error;
		console.error = () => {};

		const { getByText } = render(
			<ErrorBoundary>
				<Throw />
			</ErrorBoundary>
		);

		getByText('Something went wrong');
		getByText(/This is bad/);

		console.error = consoleLogError;
		/* eslint-enable no-console */
	});

	test('Should display the children if no error', () => {
		function DoNotThrow() {
			return <div>This is good</div>;
		}

		const { getByText, queryByText } = render(
			<ErrorBoundary>
				<DoNotThrow />
			</ErrorBoundary>
		);

		expect(queryByText('Something went wrong')).toBeNull();
		getByText('This is good');
	});
});
