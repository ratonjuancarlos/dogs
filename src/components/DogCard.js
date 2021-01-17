import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageDialog from 'components/ImageDialog'
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export default function DogCard({ remove, sb, breed }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const url = sb.subBreed ? `${breed}-${sb.subBreed}` : `${breed}`;

  const handleClickOpen = (image) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${sb.image}`}
            title={sb.subBreed}
            onClick={() => handleClickOpen(sb.image)}
          />
          <CardContent>
            <Link to={`/detail/${url}`}>
            <Typography gutterBottom variant="h4" component="h2">
              {sb.subBreed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {breed}
            </Typography>
            </Link>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => remove(sb.id)} size="small" color="primary">
            Remove from my team
          </Button>
        </CardActions>
      </Card>
      <ImageDialog
        selectedImage={sb.image}
        open={open}
        breed={`${breed} ${sb.subBreed ? sb.subBreed : ''}`}
        onClose={handleClose}
      />
    </>
  );
}
