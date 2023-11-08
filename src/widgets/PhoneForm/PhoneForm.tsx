import { Stack, Button, Group } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './PhoneForm.module.css';
import { t } from 'i18next';
import { FC } from 'react';
import '../../pages/Auth/Auth.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../entities/auth/model/selectors';
import { useAppDispatch } from '../../app/store';
import { useForm } from '@mantine/form';
import initialValues from '../../shared/config/inititalValuesForm';
import { signIn } from '../../entities/auth/model/asyncActions';

const PhoneForm: FC = () => {
  const { isLoading } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues,
  });

  const onSignIn = () => {
    const { phoneNumber } = form.values;
    const formattedPhoneNumber = '+' + phoneNumber;
    dispatch(signIn(formattedPhoneNumber));
  };

  return (
    <Stack h={300} bg="var(--mantine-color-body)" p={100} align="center">
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
  );
};

export default PhoneForm;
