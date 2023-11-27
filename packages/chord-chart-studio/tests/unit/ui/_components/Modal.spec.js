import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Modal from '../../../../src/ui/_components/Modal';

afterEach(cleanup);

describe('Modal', () => {
	test('Should render component given as children', () => {
		const modalContent = 'I am the modal content';
		const modal = render(
			<Modal closeModal={jest.fn()}>
				<div>{modalContent}</div>
			</Modal>
		);
		const renderedModal = modal.getByText(modalContent);

		expect(renderedModal).toBeInTheDocument();
	});

	test('Should close the modal when the overlay is clicked', () => {
		const closeModal = jest.fn();
		const modalContent = 'I am the modal content';
		const modal = render(
			<Modal closeModal={closeModal}>
				<div>{modalContent}</div>
			</Modal>
		);
		const modalOverlay = modal.getByTestId('modal-overlay');
		modalOverlay.click();

		expect(modalOverlay).toBeInTheDocument();
		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	test('Should close the modal on "Escape" key', async () => {
		const closeModal = jest.fn();
		const modalContent = 'I am the modal content';
		const modal = render(
			<Modal closeModal={closeModal}>
				<div>{modalContent}</div>
			</Modal>
		);
		const modalOverlay = modal.getByTestId('modal-overlay');
		expect(modalOverlay).toBeInTheDocument();

		await userEvent.keyboard('{Enter}');

		expect(closeModal).toHaveBeenCalledTimes(0);

		await userEvent.keyboard('{Escape}');

		expect(closeModal).toHaveBeenCalledTimes(1);
	});
});
