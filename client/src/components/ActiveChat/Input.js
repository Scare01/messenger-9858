import React, { useRef, useState } from "react";
import { FormControl, FilledInput, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const cloudinary = require('cloudinary/lib/cloudinary');

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    position: 'relative',

    '& .icon-block': {
      position: 'absolute',
      right: '10px',
      top: '20%',

      '& > svg': {
        fill: 'lightgray',

        '&:hover': {
          cursor: 'pointer',
        },
      },
    },

    '& .input-upload': {
      // display: 'none',
      visibility: 'hidden',
    },

  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  inputUpload: {
    display: 'none',
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;

  const inputFile = useRef(null)

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const uploadFiles = (file) => {
    cloudinary.uploader.upload(file, function(error, result) {console.log(result, error)});
  }


  const prepareFilesToUpload = (files) => {
    files.forEach(file => uploadFiles(file.name));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <div className='icon-block'>
          <SvgIcon
              component={InsertDriveFileIcon}
              onClick={() => inputFile.current.click()}
          />
        </div>
        <input
            className='input-upload'
            type="file"
            ref={inputFile}
            onChange={event => uploadFiles(event.target.files)}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
