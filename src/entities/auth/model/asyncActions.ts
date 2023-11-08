import { createAsyncThunk } from "@reduxjs/toolkit";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../app/lib/firebase.config";
import handleServerErrors from "../../../shared/api/handleServerErrors";
import handleConfirmationResult from "../../../shared/api/handleConfirmationResult";

const setupRecaptcha = (phoneNumber: string) => {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    })

    return signInWithPhoneNumber(auth, phoneNumber, recaptcha)
}

let confirmRes: ConfirmationResult;

export const signIn = createAsyncThunk(
    "auth/byPhoneNumber",
    async(phoneNumber: string, { rejectWithValue }) => {
        try {
            confirmRes = await setupRecaptcha(phoneNumber);  
            handleConfirmationResult(confirmRes);
            return confirmRes;                             
        } catch(err: any) {            
            handleServerErrors(err.code, err.message);
            return rejectWithValue(err);       
        }
    }
)

export const otpVerify = createAsyncThunk(
    'auth/otpVerify',
    async (otp: string, {rejectWithValue}) => {
        try {
            const res = await confirmRes.confirm(otp)
            return res;
        } catch(err: any) {
            handleServerErrors(err.code, err.message);
            return rejectWithValue(err);
        }
})