import appReducer from './modules/appSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        app: appReducer
    }
});
