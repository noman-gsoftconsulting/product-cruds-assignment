import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/Auth";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { deleteProduct } from "../Redux/Actions/Auth";

const useStyles = makeStyles({
  root: {
    width: 230,
    marginTop: 50,
    marginRight: 12,
    marginLeft: 12,
  },
  media: {
    height: 200,
  },
});

function ProductListing() {
  const classes = useStyles();

  const token = useSelector((state) => state.token);
  const product = useSelector((state) => state.products);
  console.log(product);
  //   console.log(token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(token));
  }, []);

  //   const handleDeleteClick = async () => {
  //     alert("Do you really want to delete this product.");
  //     const response = await dispatch(deleteProduct(id));
  //     if (response.status === 200) {
  //       history.push("/products");
  //     }
  //   };

  async function handleClick(id) {
    const response = await dispatch(deleteProduct(id));
    if (response.status === 200) {
      //   history.push("/Home")
      dispatch(getProducts(token));
    }
  }

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {product &&
        product.map((p) => (
          <Card className={classes.root} key={p.id} variant="outlined" m={2}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`https://fierce-ravine-92328.herokuapp.com${p?.coverPhoto?.url}`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Link to={`/ProductListing/${p.id}`}>
                  <Typography gutterBottom variant="h6" component="h4">
                    {p.title}
                  </Typography>
                </Link>

                {/* <Typography variant="body2" color="textSecondary" component="p">
                  {p.description}
                </Typography> */}
                <Typography variant="body2" color="secondary" component="p">
                  ${p.price}
                </Typography>
              </CardContent>
              <IconButton aria-label="delete" className={classes.margin}>
                <DeleteIcon onClick={() => handleClick(p.id)} />
              </IconButton>
            </CardActionArea>
          </Card>
        ))}
    </Grid>
  );
}

export default ProductListing;
