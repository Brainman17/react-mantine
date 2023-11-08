import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { otpVerify, signIn } from "./asyncActions";

interface AuthState {
    componentKey: string;
    otp: string;
    isLoading: boolean;
} 

const initialState: AuthState = {
    componentKey: 'phoneForm',
    otp: '',
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setComponentKey: (state, action: PayloadAction<string>) => {
            state.componentKey = action.payload;
        },
        setOtp: (state, action: PayloadAction<string>) => {
            state.otp = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(signIn.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(signIn.fulfilled, (state) => {
            state.isLoading = false;
            state.componentKey = 'otpForm';
          })
          .addCase(signIn.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(otpVerify.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(otpVerify.fulfilled, (state) => {
            state.isLoading = false;
            state.componentKey = 'homePage';
          })
          .addCase(otpVerify.rejected, (state) => {
            state.isLoading = false;
          });
      },
})

export const { setComponentKey, setOtp } = authSlice.actions;

export default authSlice.reducer;


