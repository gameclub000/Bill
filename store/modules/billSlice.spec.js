import { STATUS_FAILED, STATUS_FULFILLED, STATUS_PENDING } from '@/config/contants';
import reducer, {
    initialState,
    getBillList,
    setMonth,
    setCategory,
    resetMonth,
    resetCategory,
    selectVisibleBill
} from './billSlice';

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

    it('should handle setMonth', () => {
        const month = '2019-10';
        const action = setMonth(month);
        const state = reducer(initialState, action);
        expect(state.month).toBe(month);
    });

    it('should handle resetMonth', () => {
        const action = resetMonth();
        const state = reducer(initialState, action);
        expect(state.month).toEqual(null);
    });

    it('should handle setCategory', () => {
        const category = 'food';
        const action = setCategory(category);
        const state = reducer(initialState, action);
        expect(state.category).toBe(category);
    });

    it('should handle resetCategory', () => {
        const action = resetCategory();
        const state = reducer(initialState, action);
        expect(state.category).toEqual(null);
    });

    it('sets status when getBillList is pending', () => {
        const action = { type: getBillList.pending.type };
        const state = reducer(initialState, action);
        expect(state.status).toBe(STATUS_PENDING);
    });

    it('should dispatch fulfilled with response after fetch success', () => {
        // Return the promise
        return store.dispatch(getBillList(mockApi)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getBillList.pending().type);
            expect(actions[1].payload).toEqual(mockApi());
            expect(actions[1].type).toEqual(getBillList.fulfilled().type);
        });
    });

    it('handle response after fetch success ', () => {
        const data = mockApi();
        const action = {
            type: getBillList.fulfilled.type,
            payload: data
        };
        const state = reducer(initialState, action);
        expect(state.list).toEqual(data);
        expect(state.status).toBe(STATUS_FULFILLED);
    });

    it('should dispatch rejected with response after fetch fail', () => {
        // Return the promise
        return store.dispatch(getBillList(mockApiError)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getBillList.pending().type);
            expect(actions[1].type).toEqual(getBillList.rejected().type);
            expect(actions[1].payload).toEqual('error');
        });
    });

    it('handle response after fetch fail ', () => {
        const action = {
            type: getBillList.rejected.type,
            error: 'some error'
        };
        const state = reducer(initialState, action);
        expect(state.error).toEqual(action.error);
        expect(state.status).toBe(STATUS_FAILED);
    });

    describe('Selectors', () => {
        describe('selectVisibleBill', () => {
            it('should return visible Bill', () => {
                const mockParameters = {
                    bill: {
                        month: '2020-01',
                        category: 'category1',
                        list: [
                            {
                                time: new Date('2020-01').getTime(),
                                category: 'category1',
                                amount: 1
                            },
                            {
                                time: new Date('2020-02').getTime(),
                                category: 'category1',
                                amount: 2
                            },
                            {
                                time: new Date('2020-01').getTime(),
                                category: 'category2',
                                amount: 3
                            }
                        ]
                    }
                };
                const selected = selectVisibleBill.resultFunc(
                    mockParameters.bill.month,
                    mockParameters.bill.category,
                    mockParameters.bill.list
                );
                expect(selected.length).toBe(1);
                expect(selected).toEqual([mockParameters.bill.list[0]]);
            });
        });
    });
});
