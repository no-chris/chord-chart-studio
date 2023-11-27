import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ModalConfirm from '../../../../src/ui/_components/ModalConfirm';

afterEach(cleanup);

let props;
const confirmAction = jest.fn();
const cancelAction = jest.fn();

beforeEach(() => {
	confirmAction.mockClear();
	cancelAction.mockClear();

	props = {
		confirmAction,
		cancelAction,
	};
});

describe('ModalConfirm', () => {
	const modalContent = 'I am the modal content';

	test('Should render component given as children', () => {
		const modal = render(
			<ModalConfirm {...props}>
				<div>{modalContent}</div>
			</ModalConfirm>
		);
		const renderedModal = modal.getByText(modalContent);

		expect(renderedModal).toBeInTheDocument();
	});

	test('Should render OK and CANCEL buttons by default', () => {
		const modal = render(
			<ModalConfirm {...props}>
				<div>{modalContent}</div>
			</ModalConfirm>
		);
		const okBtn = modal.getByText('OK');
		const cancelBtn = modal.getByText('CANCEL');

		expect(okBtn).toBeInTheDocument();
		expect(cancelBtn).toBeInTheDocument();
	});

	test('Should all customizing OK and CANCEL buttons', () => {
		const modal = render(
			<ModalConfirm
				{...props}
				confirmTitle={'CONFIRM'}
				cancelTitle={'BYEBYE'}
			>
				<div>{modalContent}</div>
			</ModalConfirm>
		);
		const okBtn = modal.getByText('CONFIRM');
		const cancelBtn = modal.getByText('BYEBYE');

		expect(okBtn).toBeInTheDocument();
		expect(cancelBtn).toBeInTheDocument();
	});

	test('OK should call confirmAction()', async () => {
		const modal = render(
			<ModalConfirm {...props}>
				<div>{modalContent}</div>
			</ModalConfirm>
		);
		const okBtn = modal.getByText('OK');

		await userEvent.click(okBtn);

		expect(confirmAction).toHaveBeenCalledTimes(1);
	});

	test('CANCEL should call cancelAction()', async () => {
		const modal = render(
			<ModalConfirm {...props}>
				<div>{modalContent}</div>
			</ModalConfirm>
		);
		const okBtn = modal.getByText('CANCEL');

		await userEvent.click(okBtn);

		expect(cancelAction).toHaveBeenCalledTimes(1);
	});
});
