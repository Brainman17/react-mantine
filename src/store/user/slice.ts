import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatusEnum, UserSliceState} from './types';

const initialState: UserSliceState = {
    userNumber: null,
    isLoading: false,
    status: StatusEnum.LOADING
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setNumberUser: (state, action: PayloadAction<number>) => {
            state.userNumber = action.payload
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        }
    },
})

export const { setNumberUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;