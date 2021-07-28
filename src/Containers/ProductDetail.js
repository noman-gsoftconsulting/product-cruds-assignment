import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../Redux/Actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  mainFeaturedProduct: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedProductContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

function ProductDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const product = useSelector((state) => state.product.productDetail);
  //   console.log(product);
  const dispatch = useDispatch();
  //   const history = useHistory();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  return (
    <>
      <Paper className={classes.mainFeaturedProduct}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedProductContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {product.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {product.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <CardMedia
        className={classes.media}
        image={`https://fierce-ravine-92328.herokuapp.com${product?.coverPhoto?.url}`}
        title="Product Image"
      />
    </>
    // <div>
    //   <p>Product Detail Page</p>
    //   <img src="{product.coverPhoto.url}" alt="Images"/>
    //   <div>{product.id}</div>
    //   <div>${product.price}</div>
    //   <div>{product.description}</div>
    // </div>
  );
}

export default ProductDetail;
