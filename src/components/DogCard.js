import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export default function DogCard({ removeDog, sb, breed }) {
  const classes = useStyles();
console.log(sb.image)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${sb.image}`}
          title={sb.subBreed}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {sb.subBreed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {breed}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => removeDog(sb.id)} size="small" color="primary">
          Remove from my team
        </Button>
      </CardActions>
    </Card>
  );
}
