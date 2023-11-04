import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Stack, Button, Group, Loader } from '@mantine/core';
import '@mantine/core/styles.css';

import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../app/lib/firebase.config';
import { onCaptchaVerifier } from '../../app/lib/auth';

import { extendedWindow } from '../../shared/extendedWindow';
import PhoneInput from 'react-phone-input-2';
import OtpForm from '../../widgets/OtpForm';
import 'react-phone-input-2/lib/style.css';
import styles from './Auth.module.scss';
import './Auth.scss';
import { StatusEnum } from '../../store/user/types';

const AuthPage: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const onSignIn = () => {
    setIsLoading(true);
    onCaptchaVerifier();

    const appVerifier = extendedWindow.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        extendedWindow.confirmationResult = confirmationResult;
        setShowOtp(true);
        toast.success(StatusEnum.SUCCESS);
      })
      .catch((err: string) => {
        console.error(err);
        toast.error(StatusEnum.ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
          <ToastContainer theme={'dark'} />
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoading}
            setShowOtp={setShowOtp}
            onOtpVerify={onOtpVerify}
          />
        </>
      ) : (
        <Stack h={300} bg="var(--mantine-color-body)" p={100} align="center">
          <div id="recaptcha-container"></div>
          <form className={styles.form} onSubmit={(event) => event.preventDefault}>
            <h2 className={styles.heading}>Войдите</h2>
            <PhoneInput
              country={'ua'}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber('+' + phone)}
            />
            <Group justify="flex-end" mt={40}>
              <Button
                p="10px 60px 10px"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                className={styles.button}
                onClick={onSignIn}
              >
                {isLoading && (
                  <Loader size={16} color="white" className={styles.spinner} />
                )}
                Отправить СМС с кодом
              </Button>
            </Group>
          </form>
        </Stack>
      )}
    </>
  );
};

export default AuthPage;
