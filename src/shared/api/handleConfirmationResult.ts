import { t } from "i18next";
import { notifications } from '@mantine/notifications';

const handleConfirmationResult = (res: unknown) => {
    if(res) {
        notifications.show({
            title: t('auth.statusSuccess'),
            message: t('auth.statusMessageSuccess'),
            color: 'cyan',
        });
    }
}

export default handleConfirmationResult;