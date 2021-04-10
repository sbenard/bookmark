import { Button, Input, List } from "@material-ui/core";
import axios from "axios";
import { formatISO } from "date-fns";
import React, { ChangeEvent } from "react";
import { EditDialog } from "./EditDialog";
import { MediaItem } from "./MediaItem";
import { Media } from "./types";

function App() {
  const [url, setUrl] = React.useState("https://vimeo.com/254947206");

  const [medias, setMedias] = React.useState<Media[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const [isOpen, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const addMedia = (newMedia: Media) => {
    setMedias([newMedia, ...medias]);
  };
  const deleteMediaByIndex = (index: number) => {
    const newMedias = [...medias];
    newMedias.splice(index, 1);
    setMedias(newMedias);
  };

  const getMedia = () => {
    axios
      .get(`https://noembed.com/embed?url=${url}`)
      .then(({ data }) => {
        const formatedMedia = {
          ...data,
          created_at: formatISO(new Date()).slice(0, 16),
          keyWords: [],
        } as Media;

        addMedia(formatedMedia);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du media", err);
      });
  };

  const isEmpty = !medias.length;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Input
        placeholder="Veuillez saisir une url"
        inputProps={{ "data-testid": "url-input" }}
        value={url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUrl(event.target.value);
        }}
      />
      <Button data-testid="submit-button" disabled={!url} onClick={getMedia}>
        Valider
      </Button>
      <div>
        {isEmpty && <div> Actuellement aucun bookmark n'a été sauvegardé</div>}
        {!isEmpty && (
          <List>
            {medias.map((media, index) => (
              <MediaItem
                key={`media-item-${index}`}
                deleteMediaByIndex={deleteMediaByIndex}
                setCurrentIndex={setCurrentIndex}
                media={media}
                index={index}
                setOpen={setOpen}
              />
            ))}
          </List>
        )}
      </div>
      <EditDialog
        open={isOpen}
        index={currentIndex}
        medias={medias}
        setMedias={setMedias}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
