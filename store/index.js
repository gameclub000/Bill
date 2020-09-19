import appReducer from './modules/appSlice';
import billReducer from './modules/billSlice';
import billCategoryReducer from './modules/billCategorySlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        app: appReducer,
        bill: billReducer,
        billCategory: billCategoryReducer
    }
});
