import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user/slice';
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;