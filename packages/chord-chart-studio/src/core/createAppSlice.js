import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

export default createAppSlice;
