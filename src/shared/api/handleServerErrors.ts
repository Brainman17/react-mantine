import { t } from "i18next";
import { notifications } from '@mantine/notifications';

const handleServerErrors = (code: number, message: string) => {
    if(code) {
        notifications.show({
            title: t('auth.statusError'),
            message,
            color: 'red',
        })
    }
}

export default handleServerErrors;