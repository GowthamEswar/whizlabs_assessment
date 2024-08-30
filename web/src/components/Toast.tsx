import { toast } from 'react-toastify';
import successIcon from '../assets/success_icon.svg';
import errorIcon from '../assets/error_icon.svg';

const Toast = (severity: string, message: string) => {
    switch (severity) {
        case 'success':
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: '',
                hideProgressBar: false,
                pauseOnFocusLoss: false,
                autoClose: 3000,
                icon: () => <img alt="" src={successIcon} />
            });
            break;
        case 'error':
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: '',
                hideProgressBar: false,
                pauseOnFocusLoss: false,
                autoClose: 3000,
                icon: () => <img alt="" src={errorIcon} />
            });
            break;
        case 'warn':
            toast.warn(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: '',
                hideProgressBar: false,
                pauseOnFocusLoss: false,
                autoClose: 3000,
            });
            break;
        default:
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
    }
};
export default Toast;
