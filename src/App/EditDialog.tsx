import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Media } from "./App";

export interface EditDialogProps {
  open: boolean;
  setMedias: (media: Media[]) => void;
  onClose: () => void;
  medias: Media[];
  index: number;
}

export const EditDialog: React.FC<EditDialogProps> = ({
  onClose,
  open,
  medias,
  index,
}) => {
  const [currentMedia, setCurrentMedia] = React.useState<Media | undefined>();
  React.useEffect(() => {
    setCurrentMedia(index >= 0 ? medias[index] : undefined);
  }, [index, medias]);

  if (!currentMedia) {
    return <></>;
  }

  const handlePropChange = (
    prop: keyof Media,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurrentMedia({ ...currentMedia, [prop]: event.target.value });
    console.log(currentMedia);
  };

  const { title, author_name, author_url, height, width } = medias[index];

  const handleClose = () => {
    onClose();
  };
  const handleSave = () => {};

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
      open={open}
    >
      <DialogTitle id="edit-dialog-title">{title}</DialogTitle>
      <form style={{ margin: "10px" }}>
        <TextField
          fullWidth
          onChange={(event) => {
            handlePropChange("title", event);
          }}
          margin="normal"
          id="title-text"
          defaultValue={title}
          label="Titre"
        />
        <TextField
          fullWidth
          margin="normal"
          id="author-name-text"
          defaultValue={author_name}
          label="Auteur"
        />
        <TextField
          fullWidth
          margin="normal"
          id="author-url-text"
          defaultValue={author_url}
          label="URL"
        />
        <TextField
          fullWidth
          type="number"
          margin="normal"
          id="width-text"
          defaultValue={width}
          label="Hauteur"
        />
        <TextField
          fullWidth
          type="number"
          margin="normal"
          id="height-text"
          defaultValue={height}
          label="Largeur"
        />
      </form>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary" autoFocus>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};
