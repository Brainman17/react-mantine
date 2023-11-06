import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Stack, Button, Group, rem } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import '@mantine/core/styles.css';

import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../app/lib/firebase.config';
import { onCaptchaVerifier } from '../../app/lib/auth';

import { extendedWindow } from '../../shared/extendedWindow';
import PhoneInput from 'react-phone-input-2';
import OtpForm from '../../widgets/OtpForm/OtpForm';
import 'react-phone-input-2/lib/style.css';
import styles from './Auth.module.css';
import './Auth.css';
import initialValues from '../../shared/config/inititalValuesForm';
import handleServerErrors from '../../shared/api/handleServerErrors';

const AuthPage: FC = () => {
  const [otp, setOtp] = useState('');
  const [authStep, setAuthStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm({
    initialValues,
  });

  const onSignIn = () => {
    setIsLoading(true);
    onCaptchaVerifier();

    const appVerifier = extendedWindow.recaptchaVerifier;

    const formattedPhoneNumber = '+' + phoneNumber;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        form.setFieldValue('phoneNumber', formattedPhoneNumber);
        extendedWindow.confirmationResult = confirmationResult;
        notifications.show({
          title: t('auth.statusSuccess'),
          message: t('auth.statusMessageSuccess'),
          color: 'cyan',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
        setAuthStep(authStep + 1);
      })
      .catch((err) => {
        console.error(err);
        handleServerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { phoneNumber } = form.values;

  const onOtpVerify = () => {
    setIsLoading(true);
    extendedWindow.confirmationResult
      .confirm(otp)
      .then(() => {
        navigate('/home');
      })
      .catch((err: any) => {
        console.error(err);
        handleServerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {authStep === 2 && (
        <OtpForm
          otp={otp}
          setOtp={setOtp}
          authStep={authStep}
          setAuthStep={setAuthStep}
          isLoading={isLoading}
          onOtpVerify={onOtpVerify}
        />
      )}
      <Notifications autoClose={4000} position="top-center" />
      {authStep === 1 && (
        <Stack h={300} bg="var(--mantine-color-body)" p={100} align="center">
          <Notifications autoClose={4000} position="top-center" />
          <div id="recaptcha-container"></div>
          <form className={styles.form}>
            <h2 className={styles.heading}>{t('auth.title')}</h2>
            <PhoneInput country={'ua'} {...form.getInputProps('phoneNumber')} />
            <Group justify="flex-end" mt={40}>
              <Button
                p="10px 60px 10px"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                className={styles.button}
                onClick={onSignIn}
                loading={isLoading}
                loaderProps={{ type: 'dots' }}
              >
                {t('auth.sendMessage')}
              </Button>
            </Group>
          </form>
        </Stack>
      )}
    </>
  );
};

export default AuthPage;
