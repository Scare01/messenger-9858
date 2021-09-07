import React, { useRef, useState } from "react";
import { FormControl, FilledInput, SvgIcon, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

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
    visibility: 'hidden',
  },
  sendImageBlock: {
    display: 'flex',
    flexDirection: 'row',
    width: '200px'
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const inputFile = useRef(null)

  const handleChange = (event) => {
    setText(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: files,
    };
    await postMessage(reqBody);
    setText("");
    setFiles([]);
  };

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dbxo3rerz/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        setFiles([...files, response.secure_url]);
      }
    };

    fd.append("upload_preset",'sfjqvo6q');
    fd.append("tags", "browser_upload");
    fd.append("file", file[0]);
    xhr.send(fd);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {files.length > 0 && <Button type='submit' size='small'>Send {files.length} image(s)</Button>}
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
            onChange={event => uploadFile(event.target.files)}
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
