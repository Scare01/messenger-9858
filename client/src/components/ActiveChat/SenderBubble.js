import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Card, CardMedia, Grid, SvgIcon, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
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

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;

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
      <Typography className={classes.date}>{time}</Typography>
      <Box className={text.length ? classes.bubble : classes.bubbleWithoutText}>
        {renderImages()}
        {text && <Typography className={classes.text}>{text}</Typography> }
      </Box>
    </Box>
  );
};

export default SenderBubble;
