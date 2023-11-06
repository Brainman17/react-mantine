import { FC } from 'react';
import { Stack, Button, Group, PinInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { t } from 'i18next';
import styles from './OtpForm.module.css';

export type OtpFormProps = {
  otp: string;
  setOtp: (str: string) => void;
  isLoading: boolean;
  onOtpVerify: () => void;
  setComponentKey: (component: string) => void;
};

const OtpForm: FC<OtpFormProps> = ({
  otp,
  setOtp,
  isLoading,
  onOtpVerify,
  setComponentKey,
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
            radius="xl"
            variant="outline"
            mr={50}
            onClick={() => setComponentKey('phoneForm')}
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
