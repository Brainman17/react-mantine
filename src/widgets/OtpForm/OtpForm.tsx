import { FC } from 'react';
import { Stack, Button, Group, PinInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

import styles from '../../pages/Auth/Auth.module.css';

type OtpFormProps = {
  otp: string;
  isLoading: boolean;
  setOtp: (str: string) => void;
  onOtpVerify: () => void;
  setShowOtp: (bool: boolean) => void;
};

const OtpForm: FC<OtpFormProps> = ({
  otp,
  isLoading,
  setOtp,
  setShowOtp,
  onOtpVerify,
}) => {
  return (
    <Stack h={300} bg="var(--mantine-color-body)" p={100} ta="center">
      <form className={styles.form} onSubmit={(values) => console.log(values)}>
        <h2 className={styles.heading}>Войдите</h2>
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
          <Button onClick={() => setShowOtp(false)} radius="xl" variant="outline">
            <IconArrowLeft className={styles.icon} />
          </Button>
          <Button
            loading={isLoading}
            loaderProps={{ type: 'dots' }}
            onClick={onOtpVerify}
            radius="xl"
          >
            Войти
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default OtpForm;
