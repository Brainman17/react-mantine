import { FC } from 'react';
import { Stack, Button, Group, PinInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { t } from 'i18next';
import styles from '../../pages/Auth/Auth.module.css';

type OtpFormProps = {
  otp: string;
  setOtp: (str: string) => void;
  authStep: number;
  setAuthStep: (step: number) => void;
  isLoading: boolean;
  onOtpVerify: () => void;
};

const OtpForm: FC<OtpFormProps> = ({
  otp,
  setOtp,
  authStep,
  setAuthStep,
  isLoading,
  onOtpVerify,
}) => {
  return (
    <Stack h={300} bg="var(--mantine-color-body)" p={100} ta="center">
      <form className={styles.form}>
        <h2 className={styles.heading}>{t('auth.title')}</h2>
        <PinInput
          value={otp}
          onChange={setOtp}
          length={6}
          className={styles.pin}
          type="number"
          inputType="tel"
          oneTimeCode
        />
        <Group mt={40} justify="center">
          <Button
            onClick={() => setAuthStep(authStep - 1)}
            radius="xl"
            variant="outline"
            mr={50}
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
