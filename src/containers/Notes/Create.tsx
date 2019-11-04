import React, { useRef, useState, FormEvent } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  FormControlProps
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLibs";
import { API } from "aws-amplify";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import "./Create.css";

const CreateNote: React.FC = () => {
  const dispatch = useDispatch();
  const file = useRef<File | null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event: FormEvent<FormControlProps & FormControl>) {
    const { files } = event.target as HTMLInputElement;
    file.current = files == null ? null : files[0];
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (file.current && file.current.size > config.s3.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than
        ${config.s3.MAX_ATTACHMENT_SIZE / 1000000} MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });

      dispatch(push("/"));
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(note: {}) {
    console.log(note);
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => {
              const { value } = e.target as HTMLTextAreaElement;
              setContent(value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
};

export default CreateNote;
