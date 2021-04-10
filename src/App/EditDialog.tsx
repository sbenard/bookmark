import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { Media } from "./types";

export interface EditDialogProps {
  open: boolean;
  setMedias: (media: Media[]) => void;
  onClose: () => void;
  medias: Media[];
  index: number;
}

export const EditDialog: React.FC<EditDialogProps> = ({
  onClose,
  setMedias,
  open,
  medias,
  index,
}) => {
  const [currentMedia, setCurrentMedia] = React.useState<Media | undefined>();
  const [currentKeyWord, setCurrentKeyWord] = React.useState("");
  React.useEffect(() => {
    setCurrentMedia(index >= 0 ? medias[index] : undefined);
  }, [index, medias]);

  if (!currentMedia) {
    return <></>;
  }

  const handlePropChange = (prop: keyof Media) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurrentMedia({ ...currentMedia, [prop]: event.target.value });
  };

  const {
    keyWords,
    title,
    type,
    author_name,
    url,
    created_at,
    height,
    width,
    duration,
  } = currentMedia;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
      open={open}
    >
      <form style={{ margin: "10px" }}>
        <TextField
          fullWidth
          onChange={handlePropChange("title")}
          margin="normal"
          id="title-text"
          defaultValue={title}
          label="Titre"
        />
        <TextField
          fullWidth
          onChange={handlePropChange("created_at")}
          type="datetime-local"
          margin="normal"
          id="createdAd-text"
          defaultValue={created_at}
          label="Date d'ajout"
        />
        <TextField
          fullWidth
          onChange={handlePropChange("author_name")}
          margin="normal"
          id="author-name-text"
          defaultValue={author_name}
          label="Auteur"
        />
        <TextField
          fullWidth
          onChange={handlePropChange("url")}
          margin="normal"
          id="author-url-text"
          defaultValue={url}
          label="URL"
        />
        <TextField
          fullWidth
          disabled
          type="number"
          id="width-text"
          defaultValue={width}
          label="Hauteur"
        />
        <TextField
          fullWidth
          disabled
          type="number"
          id="height-text"
          defaultValue={height}
          label="Largeur"
        />

        {type === "video" && (
          <TextField
            fullWidth
            disabled
            type="number"
            id="duration-text"
            defaultValue={duration}
            label="Durée"
          />
        )}
      </form>
      <FormControl style={{ margin: 10 }}>
        {keyWords.length > 0 && (
          <Paper
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
            }}
          >
            {keyWords.map((keyWord, index) => (
              <Chip
                onDelete={() => {
                  const newKeyWords = [...currentMedia.keyWords];
                  newKeyWords.splice(index, 1);
                  setCurrentMedia({ ...currentMedia, keyWords: newKeyWords });
                }}
                key={`chip-${index}`}
                label={keyWord}
              />
            ))}
          </Paper>
        )}
        <Input
          id="keyWords-text"
          onChange={(event) => {
            setCurrentKeyWord(event.target.value);
          }}
          value={currentKeyWord}
          placeholder="Mots clé"
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                disabled={currentKeyWord === ""}
                aria-label="Ajouter un mot cle"
                onClick={() => {
                  setCurrentMedia({
                    ...currentMedia,
                    keyWords: [currentKeyWord, ...currentMedia.keyWords],
                  });
                  setCurrentKeyWord("");
                }}
              >
                <Add />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button
          autoFocus
          onClick={() => {
            const newMedias = [...medias];
            newMedias.splice(index, 1);
            setMedias(newMedias);
            onClose();
          }}
          color="primary"
        >
          Supprimer
        </Button>
        <Button
          onClick={() => {
            const newMedias = [...medias];
            newMedias[index] = currentMedia;
            setMedias(newMedias);
            onClose();
          }}
          color="primary"
          autoFocus
        >
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};
