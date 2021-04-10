import {
  Avatar,
  Button,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Movie, Photo } from "@material-ui/icons";
import axios from "axios";
import React, { ChangeEvent } from "react";
import { EditDialog } from "./EditDialog";

export interface Media {
  author_url: string;
  author_name: string;
  title: string;
  created_at: string;
  width: number;
  height: number;
  type: string;
  duration?: number;
}

function App() {
  const [url, setUrl] = React.useState(
    "https://www.youtube.com/watch?v=tRFOjLIl7G0"
  );
  const [medias, setMedias] = React.useState<Media[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const [isOpen, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const addMedia = (newMedia: Media) => {
    setMedias([newMedia, ...medias]);
  };

  const getMedia = () => {
    axios
      .get(`https://noembed.com/embed?url=${url}`)
      .then(({ data }) => {
        const formatedDate = {
          ...data,
          created_at: new Date().toLocaleString(),
        } as Media;

        console.log(data);
        console.log(formatedDate);
        addMedia(formatedDate);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const MediaItem: React.FC<{ media: Media; index: number }> = ({
    media,
    index,
  }) => (
    <ListItem
      button
      onClick={() => {
        setCurrentIndex(index);
        setOpen(true);
      }}
    >
      <ListItemAvatar>
        <Avatar>{media.type === "video" ? <Movie /> : <Photo />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={media.title} secondary={media.author_name} />
    </ListItem>
  );

  const isEmpty = !medias.length;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Input
        placeholder="Veuillez saisir une url"
        value={url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUrl(event.target.value);
        }}
      />
      <Button disabled={!url} onClick={getMedia}>
        Valider
      </Button>
      <div>
        {isEmpty && <div> Actuellement aucun bookmark n'a été sauvegardé</div>}
        {!isEmpty && (
          <List>
            {medias.map((media, index) => (
              <MediaItem
                key={`media-item-${index}`}
                media={media}
                index={index}
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
