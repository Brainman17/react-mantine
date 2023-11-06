import { FC } from 'react';
import PhoneForm from '../../widgets/PhoneForm/PhoneForm';
import OtpForm from '../../widgets/OtpForm/OtpForm';
import 'react-phone-input-2/lib/style.css';
import './Auth.css';

type AuthPageProps = {
  otp: string;
  setOtp: (str: string) => void;
  isLoading: boolean;
  onSignIn: () => void;
  onOtpVerify: () => void;
  setComponentKey: (component: string) => void;
  getInputProps: Function;
};

const AuthPage: FC<AuthPageProps> = ({
  otp,
  setOtp,
  isLoading,
  onOtpVerify,
  onSignIn,
  getInputProps,
  setComponentKey,
}) => {
  return (
    <>
      <OtpForm
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
        onOtpVerify={onOtpVerify}
        setComponentKey={setComponentKey}
      />
      <PhoneForm
        getInputProps={getInputProps}
        onSignIn={onSignIn}
        isLoading={isLoading}
      />
    </>
  );
};

export default AuthPage;
