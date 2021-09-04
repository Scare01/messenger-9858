import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    mainContainer: {
        height: '100vh',
    },
    submitButton: {
        width: '160px',
        height: '66px',
        backgroundColor: '#3A8DFF',
        borderRadius: '3px',
        color: '#FFFFFF',
        fontSize: '16px',
        '&:hover': {
            opacity: '0.8',
            backgroundColor: '#3A8DFF',
        }
    },
    redirectButton: {
        width: '160px',
        height: '66px',
        backgroundColor: '#FFFFFF',
        color: '#3A8DFF',
        fontSize: '14px',
        boxShadow: '0 2px 12px 0 rgba(74,106,149,0.20)',
        borderRadius: '5px',
    },
    formControl: {
        height: '66px',
        '& .MuiInputLabel-shrink': {
            transform:' translate(0, -15px) scale(0.75)',
        },
        '& .MuiInputBase-input': {
            padding: '10px 0',

            '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
            }
        },
    },
}));