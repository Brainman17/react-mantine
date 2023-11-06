import { t } from "i18next";
import { notifications } from '@mantine/notifications';

import { INVALID_CODE } from "../config/constants";

const handleServerErrors = (code: string) => {
    if(code === `${INVALID_CODE}phone-number`) {
        notifications.show({
            title: t('auth.statusPhoneNumberError'),
            message: t('auth.statusMessagePhoneNumberError'),
            color: 'red',
          });
    } else if(code === `${INVALID_CODE}verification-code`) {
        notifications.show({
            title: t('auth.statusVerificationError'),
            message: t('auth.statusMessageVerificationError'),
            color: 'red'
          });
    }
}

export default handleServerErrors;