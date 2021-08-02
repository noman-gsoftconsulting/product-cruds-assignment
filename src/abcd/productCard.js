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
    height: 140,
  },
});

function ProductCard() {
  const classes = useStyles();

  const token = useSelector((state) => state.token);
  const product = useSelector((state) => state.products);
  console.log(product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(token));
  }, []);
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Product Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Product Description Here
          </Typography>
          <Typography variant="body2" color="primarySecondary" component="p">
            Product Price
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;

//This is for change folder names.

