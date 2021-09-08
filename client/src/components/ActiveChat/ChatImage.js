import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    image: {
        width: '150px',
        height: '100px',
        padding: '0',
        marginLeft: '5px',
        borderRadius: '15px',
    },
    imageWithText: {
        width: '150px',
        height: '100px',
        padding: '0',
        marginLeft: '0',
        borderRadius: '15px',
    }
}));

export const ChatImage = (props) => {
    const classes = useStyles();
    const { attachments, text } = props;

    if (!attachments) {
        return null;
    }
    return (
        <Box>
            { attachments.map(attach => <img src={attach} className={text ? classes.imageWithText : classes.image} />)}
        </Box>
    )
};
