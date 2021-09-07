import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  },
  bubbleWithoutText: {
    background: 'none',
    borderRadius: "10px 10px 0 10px"
  },
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

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;

  const renderImages = () => {
    if (!attachments) {
      return null;
    }
    return (
        <Box className={classes.imageBox}>
          { attachments.map(attach => <img src={attach} className={text ? classes.imageWithText : classes.image} />)}
        </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          {renderImages()}
          {text && <Typography className={classes.text}>{text}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
