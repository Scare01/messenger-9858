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
    formTitle: {
        fontSize: '26px',
        color: '#000000',
        lineHeight: '40px',
        marginBottom: '33px',
    },
    loginSignupContainer: {
        position: 'relative',
    },
    titleChangePage: {
        fontSize: '14px',
        color: '#B0B0B0',
        textAlign: 'center',
    },
    redirectBlock: {
        position: 'absolute',
        height: '54px',
        width: '351px',
        alignItems: 'center',
        right: '30px',
        top: '30px',
        justifyContent: 'flex-end',

        '& > p': {
            marginRight: '20px',
        },
        [theme.breakpoints.down(430)]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            right: '0',

            '& > p': {
                marginRight: '0',
                marginBottom: '10px',
            },
        },
    }
}));