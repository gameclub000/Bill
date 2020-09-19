import {
    STATUS_FAILED,
    STATUS_FULFILLED,
    STATUS_IDLE,
    STATUS_PENDING
} from '@/config/contants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import repositoryBill from '@/respository/Bill/response';
import { utcToLocal } from '@/utils/utcToLocal';

const ACTION_LIST = 'bill/fetchList';

export const initialState = {
    month: null,
    category: null,
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
    reducers: {
        setMonth: (state, action) => {
            if (action.payload) {
                state.month = action.payload;
            }
        },
        resetMonth: (state) => {
            state.month = null;
        },
        setCategory: (state, action) => {
            if (action.payload) {
                state.category = action.payload;
            }
        },
        resetCategory: (state) => {
            state.category = null;
        }
    },
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

export const selectMonth = (state) => state.bill.month;
export const selectCategory = (state) => state.bill.category;
export const selectBill = (state) => state.bill.list;

export const selectVisibleBill = createSelector(
    selectMonth,
    selectCategory,
    selectBill,
    (month, category, bills) => {
        return bills.filter((item) => {
            if (month) {
                const dateFormat = utcToLocal(item.time, 'YYYY-MM');
                if (dateFormat !== month) {
                    return false;
                }
            }
            if (category) {
                if (item.category !== category) {
                    return false;
                }
            }
            return true;
        });
    }
);

export const {
    setMonth,
    resetMonth,
    setCategory,
    resetCategory
} = slice.actions;

export default slice.reducer;
