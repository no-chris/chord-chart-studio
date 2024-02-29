import React, { useEffect, useReducer } from 'react';

import { GET_TAB_DATA } from '../../core/messageTypes';
import createMessage from '../../core/createMessage';
import { sendMessageToActiveTab } from '../../core/sendMessage';
import sendToChordChartsStudio from '../sendToChordChartsStudio';

import Status from './Status';
import UserMessage from './UserMessage';
import Button from './Button';

const initialState = {
	statusId: 'unsupported',
	userMessage: null,
	tabData: null,
};

function reducer(state, action) {
	const result = action.payload;

	switch (action.type) {
		case 'switchToOk':
			return {
				statusId: 'ok',
				tabData: result,
				userMessage: (
					<span>
						<strong>{result.title}</strong> by{' '}
						<strong>{result.artist}</strong> is ready to be imported
					</span>
				),
			};
		case 'switchToUnsupported':
			return {
				statusId: 'unsupported',
				tabData: null,
				userMessage:
					'Sorry, the chord charts from this website (if any...) cannot be imported yet.',
			};
		case 'switchToError':
			return {
				statusId: 'websiteError',
				tabData: null,
				userMessage: result,
			};
		default:
			throw new Error();
	}
}

const Popup = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	/* */
	useEffect(() => {
		const getTabData = createMessage(GET_TAB_DATA);
		sendMessageToActiveTab(getTabData)
			.then((result) => {
				if (result.error) {
					dispatch({
						type: 'switchToError',
						payload: result.message,
					});
				} else {
					dispatch({
						type: 'switchToOk',
						payload: result,
					});
				}
			})
			.catch(() => {
				dispatch({
					type: 'switchToUnsupported',
				});
			});
	});
	/* */
	const onClick = () => {
		const message = createMessage('@CCS/IMPORT_TAB', state.tabData);
		sendToChordChartsStudio(message);
	};

	return (
		<div>
			<Status statusId={state.statusId} />
			<UserMessage userMessage={state.userMessage} />
			<Button statusId={state.statusId} onClick={onClick} />
		</div>
	);
};

export default Popup;
