import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Stack, Button, Group } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
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
import { StatusEnum } from '../../store/user/types';

const AuthPage: FC = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      phoneNumber: '+',
      termsOfService: false,
    },
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
        setShowOtp(true);
        notifications.show({
          title: StatusEnum.SUCCESS,
          message: 'Enter confirmation code!',
          color: 'cyan',
        });
      })
      .catch((err: string) => {
        console.error(err);
        notifications.show({
          title: StatusEnum.ERROR,
          message: 'Something went wrong!',
          color: 'red',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { phoneNumber } = form.values;
  console.log(phoneNumber);

  const onOtpVerify = () => {
    setIsLoading(true);
    extendedWindow.confirmationResult
      .confirm(otp)
      .then((res: any) => {
        console.log(res);

        navigate('/home');
      })
      .catch((err: string) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {showOtp ? (
        <>
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoading}
            setShowOtp={setShowOtp}
            onOtpVerify={onOtpVerify}
          />
          <Notifications autoClose={4000} />
        </>
      ) : (
        <Stack h={300} bg="var(--mantine-color-body)" p={100} align="center">
          <div id="recaptcha-container"></div>
          <form
            className={styles.form}
            onSubmit={form.onSubmit((values) => console.log(values))}
          >
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
