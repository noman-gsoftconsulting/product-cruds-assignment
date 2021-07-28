import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addProduct } from "../Redux/Actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../Redux/Actions/productActions";
import { updateProduct } from "../Redux/Actions/productActions";
import { useHistory } from "react-router";
import AlertMessage from "./AlertMessage";
import { alertNotification } from "../Redux/Actions/messagesAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddEdit(props) {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [value, setValue] = useState("");
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    if (id) {
      const response = await dispatch(getProductDetail(id));
      // console.log(response?.data?.coverPhoto?.url);
      setValue({
        title: response?.data?.title,
        price: response?.data?.price,
        description: response?.data?.description,
        attachment: response?.data?.attachment,
      });
    } else {
      // console.log(id);
    }
  }, [id]);

  const classes = useStyles();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
    price: yup
      .string("Price is required.")
      .matches(/^[0-9]+$/, "Price must be in numerics")
      .required("Price is required."),
    //   .test("type", "Required & Only support in jpg format", (value) => {
    //     return value && value.type === "jpg";
    //   }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("files", imageData);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios
      .post(
        "https://fierce-ravine-92328.herokuapp.com/upload",
        formData,
        config
      )
      .then((resp) => {
        console.log(resp.status);
        return resp;
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(resp, "==============");
    if (id) {
      const response = await dispatch(
        updateProduct({
          title: data?.title,
          price: data?.price,
          description: data?.description,
          coverPhoto: resp?.data[0]?.id,
          id,
        })
      );
      // console.log(response);
      if (response?.status === 200) {
        dispatch(
          alertNotification({ message: "Product successfully updated.", open: true, severity: "success" })
        );
        setTimeout(() => {
          history.push("/home");
          }, 7000)
      } else {
        dispatch(
          alertNotification({ message: "Error while updating product.", open: true, severity: "error" })
        );
      }
      // console.log(response?.status);
      // console.log("Product Updated Successfully");
    } else {
      const response = await dispatch(
        addProduct({
          title: data?.title,
          price: data?.price,
          description: data?.description,
          coverPhoto: resp?.data[0]?.id,
        })
      );
      console.log(response?.status);
      console.log("Product is Added Successfully");
      if (response?.status === 200) {
        dispatch(
          alertNotification({ message: "Product is Added Successfully", open: true, severity: "success" })
        );
        setTimeout(() => {
        history.push("/home");
        }, 7000)
      } else {
        dispatch(
          alertNotification({ message: "Error while adding product.", open: true, severity: "error" })
        );
      }
    }
  };

  const handleChange = (event) => {
    setImageData(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                fullWidth
                id="title"
                label="Title"
                autoFocus
                InputLabelProps={{ shrink: true }}
                value={value.title}
                {...register("title", { required: true })}
                error={errors.title ? true : false}
                helperText={errors.title?.message}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="price"
                label="Price"
                name="price"
                InputLabelProps={{ shrink: true }}
                value={value.price}
                {...register("price", { required: true })}
                error={errors.price ? true : false}
                helperText={errors.price?.message}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                InputLabelProps={{ shrink: true }}
                value={value.description}
                {...register("description", { required: true })}
                error={errors.description ? true : false}
                helperText={errors.description?.message}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                value={value.attachment}
                // {...register("attachment", { required: true })}
                // error={errors.attachment ? true : false}
                // helperText={errors.attachment?.message}
                onChange={handleChange}
              />
              {image && <img src={image} alt={value.title} />}
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                >
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {props.button}
          </Button>
          <AlertMessage />
        </form>
      </div>
    </Container>
  );
}

export default AddEdit;
