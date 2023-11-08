import { FC } from "react";
import OtpForm from "../../widgets/OtpForm/OtpForm";
import PhoneForm from "../../widgets/PhoneForm/PhoneForm";
import HomePage from "../../pages/Home/HomePage";

type Components = {
    [key: string]: FC;
};

const componentMap: Components = {
    phoneForm: PhoneForm,
    otpForm: OtpForm,
    homePage: HomePage,
};

export default componentMap;