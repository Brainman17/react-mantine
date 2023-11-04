import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusEnum, UserSliceState} from './types';
// import { onCaptchaVerifier } from "../../app/lib/auth";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../app/lib/firebase.config";
// import { extendedWindow } from "../../shared/extendedWindow";
// import { toast } from 'react-toastify';
// import { onCaptchaVerifier } from "../../app/lib/auth";


const initialState: UserSliceState = {
    userNumber: null,
    isLoading: false,
    status: StatusEnum.LOADING
}

// export const signIn = createAsyncThunk(
//     "user/signInStatus",
//     async (phone: string, { rejectWithValue }) => { 
//         onCaptchaVerifier();
//         const appVerifier = extendedWindow.recaptchaVerifier;
//         try {
                 
//             const res = await signInWithPhoneNumber(auth, phone, appVerifier);
            
//             extendedWindow.confirmationResult = res; 
//             toast.success(StatusEnum.SUCCESS);
//         } catch(err) {
//             toast.error(StatusEnum.ERROR);
//             rejectWithValue(err);
//         }  
//     }
//   );

// export const otpVerify = createAsyncThunk(
//     'user/otpVerify', 
//     async (otp: string, {rejectWithValue}) => {
//         try {
//             const res = await extendedWindow.confirmationResult.confirm(otp)
//             console.log(res);
        
//             // navigate('/home');
//         } catch(err) {
//             console.error(err);
//             rejectWithValue(err);
//         }

// })



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setNumberUser: (state, action: PayloadAction<number>) => {
            state.userNumber = action.payload
        },
        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase (signIn.pending, (state) => {
    //         state.status = StatusEnum.LOADING;
    //         state.isLoading = true;
    //     })
    //     builder.addCase (signIn.fulfilled, (state) => {
    //         state.status = StatusEnum.SUCCESS;
    //         state.isLoading = false;
    //     })
    //     builder.addCase (signIn.rejected, (state) => {
    //         state.status = StatusEnum.ERROR;
    //         state.isLoading = false;
    //     })
    // }
})

export const { setNumberUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;