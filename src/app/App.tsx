import { FC, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Divider, rem } from '@mantine/core';
import '@mantine/core/styles/global.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import styles from './App.module.css';
import HomePage from '../pages/Home/HomePage';
import Header from '../widgets/Header/Header';
import { Notifications, notifications } from '@mantine/notifications';
import PhoneForm, { PhoneFormProps } from '../widgets/PhoneForm/PhoneForm';
import OtpForm, { OtpFormProps } from '../widgets/OtpForm/OtpForm';
import { extendedWindow } from '../shared/extendedWindow';
import handleServerErrors from '../shared/api/handleServerErrors';
import { IconCheck } from '@tabler/icons-react';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './lib/firebase.config';
import { onCaptchaVerifier } from './lib/auth';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import initialValues from '../shared/config/inititalValuesForm';

const App: FC = () => {
  const [componentKey, setComponentKey] = useState('phoneForm');

  const form = useForm({
    initialValues,
  });

  type Components = {
    [key: string]: FC<PhoneFormProps> | FC<OtpFormProps>;
  };

  const componentMap: Components = {
    phoneForm: PhoneForm,
    otpForm: OtpForm,
  };

  const AuthPage = componentMap[componentKey];

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  type ServerError = {
    code: number;
    message: string;
    errors: string[];
  };

  const onSignIn = () => {
    setIsLoading(true);
    onCaptchaVerifier();

    const appVerifier = extendedWindow.recaptchaVerifier;

    const formattedPhoneNumber = '+' + phoneNumber;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        form.setFieldValue('phoneNumber', formattedPhoneNumber);
        extendedWindow.confirmationResult = confirmationResult;
        setComponentKey('otpForm');
        notifications.show({
          title: t('auth.statusSuccess'),
          message: t('auth.statusMessageSuccess'),
          color: 'cyan',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
      })
      .catch((err: ServerError) => {
        console.error(err);
        handleServerErrors(err.code, err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { phoneNumber } = form.values;
  const { getInputProps } = form;

  const onOtpVerify = () => {
    setIsLoading(true);
    extendedWindow.confirmationResult
      .confirm(otp)
      .then(() => {
        navigate('/home');
      })
      .catch((err: ServerError) => {
        console.log(err);

        console.error(err);
        handleServerErrors(err.code, err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.app}>
      <Notifications autoClose={4000} position="top-center" />
      <Header />
      <Divider my="xs" />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <AuthPage
                isLoading={isLoading}
                onSignIn={onSignIn}
                onOtpVerify={onOtpVerify}
                setComponentKey={setComponentKey}
                otp={otp}
                setOtp={setOtp}
                getInputProps={getInputProps}
              />
            }
          />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
