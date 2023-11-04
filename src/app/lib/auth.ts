import { RecaptchaVerifier } from "firebase/auth";
import { extendedWindow } from "../../shared/extendedWindow";
import { auth } from "./firebase.config";

export const onCaptchaVerifier = () => {
    if (!extendedWindow.recaptchaVerifier) {
      extendedWindow.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
        },
      );
    }
  };