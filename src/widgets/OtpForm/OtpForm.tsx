import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Stack, Button, Group, PinInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { t } from 'i18next';
import styles from './OtpForm.module.css';
import { setComponentKey, setOtp } from '../../entities/auth/model/slice';
import { selectAuth } from '../../entities/auth/model/selectors';
import { useAppDispatch } from '../../app/store';
import { otpVerify } from '../../entities/auth/model/asyncActions';

const OtpForm: FC = () => {
  const dispatch = useAppDispatch();
  const { otp, isLoading } = useSelector(selectAuth);

  const onOtpVerify = () => {
    dispatch(otpVerify(otp));
  };

  return (
    <Stack h={300} bg="var(--mantine-color-body)" p={100} ta="center">
      <form className={styles.form}>
        <h2 className={styles.heading}>{t('auth.title')}</h2>
        <PinInput
          value={otp}
          onChange={(value) => dispatch(setOtp(value))}
          length={6}
          className={styles.pin}
          type="number"
          inputType="tel"
          oneTimeCode
        />
        <Group mt={40} justify="center">
          <Button
            radius="xl"
            variant="outline"
            mr={50}
            onClick={() => dispatch(setComponentKey('phoneForm'))}
          >
            <IconArrowLeft className={styles.icon} />
          </Button>
          <Button
            loading={isLoading}
            loaderProps={{ type: 'dots' }}
            onClick={onOtpVerify}
            radius="xl"
            pl={30}
            pr={30}
            disabled={otp.length < 6}
          >
            {t('auth.confirmation')}
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default OtpForm;
