import { createAsyncThunk } from '@reduxjs/toolkit';
import dispatchThunk from './dispatchThunk';

describe('dispatchThunk', () => {
	test('should return thunk action', async () => {
		const myThunk = createAsyncThunk('slice/action', (param1, thunkAPI) => {
			const { getState } = thunkAPI;
			return Promise.resolve({
				param1,
				param2: getState().paramState1,
				param3: getState().paramState2,
			});
		});

		const expectedAction = {
			type: 'slice/action/fulfilled',
			payload: {
				param1: 'myParam1',
				param2: 'myParamState1',
				param3: 'myParamState2',
			},
		};

		const globalState = {
			paramState1: 'myParamState1',
			paramState2: 'myParamState2',
		};

		const action = await dispatchThunk(globalState, () =>
			myThunk('myParam1')
		);

		expect(action.type).toEqual(expectedAction.type);
		expect(action.payload).toEqual(expectedAction.payload);
	});
});
