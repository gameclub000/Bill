import { STATUS_FAILED, STATUS_FULFILLED, STATUS_IDLE, STATUS_PENDING } from '@/config/contants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import repositoryBillCategory from '@/respository/BillCategory/response';

const ACTION_LIST = 'billCategory/fetchList';

export const initialState = {
    list: [],
    status: STATUS_IDLE,
    error: null
};

export const getBillCategoryList = createAsyncThunk(
    ACTION_LIST,
    async (api = repositoryBillCategory, { rejectWithValue }) => {
        try {
            const response = await api();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const slice = createSlice({
    name: 'billCategory',
    initialState,
    reducers: {},
    extraReducers: {
        [getBillCategoryList.pending]: (state) => {
            state.status = STATUS_PENDING;
        },
        [getBillCategoryList.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = STATUS_FULFILLED;
        },
        [getBillCategoryList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectBillCategory = (state) => state.billCategory.list;

export default slice.reducer;
