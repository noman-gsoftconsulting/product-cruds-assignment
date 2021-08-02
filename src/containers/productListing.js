import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { deleteProduct } from "../redux/actions/productActions";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: 230,
    marginTop: 50,
    marginRight: 12,
    marginLeft: 12,
  },
  media: {
    height: 200,
    width: 230,
  },
  pointer: {
    cursor: "default",
  },
});

function ProductListing() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const productList = useSelector((state) => state.product.products);
  // console.log(productList.product);

  const dispatch = useDispatch();
  useEffect(() => {
    // setTimeout(() => {
      dispatch(getProducts(token));
      setLoading(false);
    // }, 400);
  }, []);

  async function handleClick(id) {
    dispatch(deleteProduct(id));
  }

  return (
    <>
      {loading ? (
        <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {productList &&
            productList?.map((p) => (
              <Card
                className={classes.root}
                key={p.id}
                variant="outlined"
                m={2}
              >
                <CardActionArea className={classes.pointer}>
                  <img
                    className={classes.media}
                    src={`https://fierce-ravine-92328.herokuapp.com${p?.coverPhoto?.url}`}
                    title="Product Image"
                    onError={(e) => {
                      e.target.src =
                        "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
                    }}
                  />
                  <CardContent>
                    <Link to={`/product-detail/${p.id}`}>
                      <Typography gutterBottom variant="h6" component="h4">
                        {p.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="secondary" component="p">
                      ${p.price}
                    </Typography>
                  </CardContent>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete this Item?"
                        );
                        if (confirmBox === true) {
                          handleClick(p.id);
                        }
                      }}
                    />
                  </IconButton>
                  <Link to={`/edit-product/${p.id}`}>
                    <IconButton aria-label="delete" className={classes.margin}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </CardActionArea>
              </Card>
            ))}
        </Grid>
      )}
    </>
  );
}

export default ProductListing;
