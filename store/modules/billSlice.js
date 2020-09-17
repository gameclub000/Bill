import { STATUS_FAILED, STATUS_FULFILLED, STATUS_IDLE, STATUS_PENDING } from '@/config/contants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import repositoryBill from '@/respository/Bill/response';

const ACTION_LIST = 'bill/fetchList';

export const initialState = {
    list: [],
    status: STATUS_IDLE,
    error: null
};

export const getBillList = createAsyncThunk(
    ACTION_LIST,
    async (api = repositoryBill, { rejectWithValue }) => {
        try {
            const response = await api();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const slice = createSlice({
    name: 'bill',
    initialState,
    reducers: {},
    extraReducers: {
        [getBillList.pending]: (state) => {
            state.status = STATUS_PENDING;
        },
        [getBillList.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = STATUS_FULFILLED;
        },
        [getBillList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectBill = (state) => state.bill.list;

export default slice.reducer;
