import React, { useRef, useState, useEffect, FormEvent } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  FormControlProps
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import { s3Upload } from "../../libs/awsLibs";
import { API, Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedType, TNote } from "../../types";
import { push } from "connected-react-router";
import { RouteComponentProps } from "react-router-dom";
import "./Create.css";

const Note: React.FC<RouteComponentProps<{ id?: string }>> = props => {
  const { match } = props;
  const noteId = match.params.id;
  const [note, setNote] = useState<TNote | null>(null);
  const dispatch = useDispatch();
  const file = useRef<File | null>(null);
  const [content, setContent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useSelector((state: isAuthenticatedType) => ({
    isAuthenticated: state.loggedin_state
  }));

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event: FormEvent<FormControlProps & FormControl>) {
    const { files } = event.target as HTMLInputElement;
    file.current = files == null ? null : files[0];
  }

  function formatFilename(str: string) {
    return str.replace(/^\w+-/, "");
  }

  function loadNote() {
    return API.get("notes", "/notes/" + noteId, []);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      await updateNote({ content, attachment });

      dispatch(push("/"));
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const note = await loadNote();
        const { content, attachment } = note;
        setContent(content);

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(note.attachment);
        }
        setNote(note);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);
  
  function updateNote(note: any) {
    return API.put("notes", "/notes/" + noteId, {
      body: note
    });
  }

  async function handleDelete(
    event: FormEvent<FormControlProps & FormControl>
  ) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  function deleteNote() {
    return API.del("notes", "/notes/" + noteId, []);
  }

  return (
    <div className="view">
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
        {note !== null && note.attachment && (
          <FormGroup>
            <ControlLabel>Attachment</ControlLabel>
            <FormControl.Static>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={note.attachmentURL}
              >
                {formatFilename(note.attachment)}
              </a>
            </FormControl.Static>
          </FormGroup>
        )}
        <FormGroup controlId="file">
          {note !== null && !note.hasOwnProperty("attachment") && (
            <ControlLabel>Attachment</ControlLabel>
          )}
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
          Save
        </LoaderButton>
        <LoaderButton
          block
          bsSize="large"
          bsStyle="danger"
          onClick={handleDelete}
          isLoading={isDeleting}
        >
          Delete
        </LoaderButton>
      </form>
    </div>
  );
};

export default Note;
