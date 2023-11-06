import { Stack, Button, Group } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './PhoneForm.module.css';
import { t } from 'i18next';
import { FC } from 'react';
import '../../pages/Auth/Auth.css';

export type PhoneFormProps = {
  onSignIn: () => void;
  isLoading: boolean;
  getInputProps: Function;
};

const PhoneForm: FC<PhoneFormProps> = ({ onSignIn, isLoading, getInputProps }) => {
  return (
    <Stack h={300} bg="var(--mantine-color-body)" p={100} align="center">
      <div id="recaptcha-container"></div>
      <form className={styles.form}>
        <h2 className={styles.heading}>{t('auth.title')}</h2>
        <PhoneInput country={'ua'} {...getInputProps('phoneNumber')} />
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
  );
};

export default PhoneForm;
