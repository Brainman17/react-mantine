import { FC } from 'react';
import PhoneForm from '../../widgets/PhoneForm/PhoneForm';
import OtpForm from '../../widgets/OtpForm/OtpForm';
import 'react-phone-input-2/lib/style.css';
import './Auth.css';

const AuthPage: FC = () => {
  return (
    <>
      <OtpForm />
      <PhoneForm />
    </>
  );
};

export default AuthPage;
