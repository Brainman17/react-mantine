import { ConfirmationResult } from "firebase/auth";

type ExtendedWindow = Window & typeof globalThis & {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
}
