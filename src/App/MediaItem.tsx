import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Delete, Link, Movie, Photo } from "@material-ui/icons";
import { format } from "date-fns";
import { Media } from "./types";

interface MediaItemProps {
  setCurrentIndex: (index: number) => void;
  setOpen: (isOpen: boolean) => void;
  deleteMediaByIndex: (index: number) => void;
  media: Media;
  index: number;
}

export const MediaItem: React.FC<MediaItemProps> = ({
  media,
  index,
  setCurrentIndex,
  deleteMediaByIndex,
  setOpen,
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
    <ListItemText
      primary={`${media.title} - ${media.author_name}`}
      secondary={`Ajouté le ${format(
        new Date(media.created_at),
        "dd/MM/yyyy - HH'h':mm"
      )}`}
    />
    <ListItemSecondaryAction>
      <IconButton
        onClick={() => {
          window.open(media.url);
        }}
        edge="end"
        aria-label="redirection vers l'url"
      >
        <Link />
      </IconButton>
      <IconButton
        onClick={() => {
          deleteMediaByIndex(index);
        }}
        edge="end"
        aria-label="delete"
      >
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
