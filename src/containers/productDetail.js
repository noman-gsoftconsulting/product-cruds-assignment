import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../redux/actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
    width: 330,
  },
  grid: {
    marginTop: 15,
  },
}));

function ProductDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const product = useSelector((state) => state.product.productDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <>
      {product ? (
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            component="span"
            style={{ top: 5, left: 5 }}
            onClick={handleClick}
          >
            Go Back
          </Button>
          <Grid container className={classes.grid}>
            <Grid item md={6}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {product?.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {product?.description}
              </Typography>
            </Grid>
          </Grid>
          <img
            className={classes.media}
            src={`https://fierce-ravine-92328.herokuapp.com${product?.coverPhoto?.url}`}
            title="Product Image"
            onError={(e) => {
              e.target.src =
                "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
            }}
          />
        </div>
      ) : (
        <h3>Sorry Page Not Found</h3>
      )}
    </>
  );
}

export default ProductDetail;
