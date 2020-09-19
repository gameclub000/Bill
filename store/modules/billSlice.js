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
import { groupBy, sumBy } from 'lodash';
import { selectBillCategory } from '@/store/modules/billCategorySlice';
import dict from '@/utils/dict';

const ACTION_LIST = 'bill/fetchList';

export const initialState = {
    date: null,
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
                const { date, dateString } = action.payload;
                state.date = date;
                state.month = dateString;
            }
        },
        resetMonth: (state) => {
            state.date = null;
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

export const selectCategoryAmountList = createSelector(
    selectVisibleBill,
    selectBillCategory,
    (bills, billCategory) => {
        const result = [];
        const categoryGroup = groupBy(bills, 'category');
        Object.keys(categoryGroup).map((item) => {
            result.push({
                value: sumBy(categoryGroup[item], (o) => o.amount),
                type: dict({ key: item, dictionary: billCategory })
            });
        });
        return result;
    }
);

export const selectTotalExpenditure = createSelector(
    selectVisibleBill,
    (bills) => sumBy(bills, (o) => (o.type === 0 ? o.amount : 0))
);

export const selectTotalIncome = createSelector(selectVisibleBill, (bills) =>
    sumBy(bills, (o) => (o.type === 1 ? o.amount : 0))
);

export const {
    setMonth,
    resetMonth,
    setCategory,
    resetCategory
} = slice.actions;

export default slice.reducer;
