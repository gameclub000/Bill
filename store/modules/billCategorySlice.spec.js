import { STATUS_FAILED, STATUS_FULFILLED, STATUS_PENDING } from '@/config/contants';
import reducer, { getBillCategoryList, initialState } from './billCategorySlice';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockApi = () => [1];
const mockApiError = () => {
    throw 'error';
};

let store;

describe('bill Slice', () => {
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('should pass this canary test', () => expect(true).toBe(true));

    it('sets status when getBillCategoryList is pending', () => {
        const action = { type: getBillCategoryList.pending.type };
        const state = reducer(initialState, action);
        expect(state.status).toBe(STATUS_PENDING);
    });

    it('should dispatch fulfilled with response after fetch success', () => {
        // Return the promise
        return store.dispatch(getBillCategoryList(mockApi)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getBillCategoryList.pending().type);
            expect(actions[1].payload).toEqual(mockApi());
            expect(actions[1].type).toEqual(getBillCategoryList.fulfilled().type);
        });
    });

    it('handle response after fetch success ', () => {
        const data = mockApi();
        const action = {
            type: getBillCategoryList.fulfilled.type,
            payload: data
        };
        const state = reducer(initialState, action);
        expect(state.list).toEqual(data);
        expect(state.status).toBe(STATUS_FULFILLED);
    });

    it('should dispatch rejected with response after fetch fail', () => {
        // Return the promise
        return store.dispatch(getBillCategoryList(mockApiError)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getBillCategoryList.pending().type);
            expect(actions[1].type).toEqual(getBillCategoryList.rejected().type);
            expect(actions[1].payload).toEqual('error');
        });
    });

    it('handle response after fetch fail ', () => {
        const action = {
            type: getBillCategoryList.rejected.type,
            error: 'some error'
        };
        const state = reducer(initialState, action);
        expect(state.error).toEqual(action.error);
        expect(state.status).toBe(STATUS_FAILED);
    });
});
