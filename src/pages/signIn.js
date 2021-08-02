import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { logIn } from "../redux/actions/auth";
import { useHistory } from "react-router";
import { alertNotification } from "../redux/actions/messagesAction";
import AlertMessage from "../components/alertMessage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      // .matches(/^[a-zA-Z0-9_]*$/, "Please enter a valid identifier.")
      .required("Please enter a valid username."),
    password: yup
      .string()
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      //   "Please enter a valid password."
      // )
      // .min(
      //   8,
      //   "Password must be 8 to 15 characters long which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
      // )
      // .max(32)
      .required("Please enter a valid password."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let [enabled, setEnabled] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    setEnabled(true);
    const response = await dispatch(
      logIn({
        identifier: data.identifier,
        password: data.password,
      })
    );
    if (response?.status === 200) {
      localStorage.setItem("isAuthenticated", "true");
      history.push("/home");
    } else {
      dispatch(
        alertNotification({
          message: "Incorrect username or password.",
          open: true,
          severity: "error",
        })
      );
      setEnabled(false);
    }
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuthenticated");
    // console.log(isAuth);
    if (isAuth) {
      history.push("/home");
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoFocus
            {...register("identifier", { required: true })}
            error={errors.identifier ? true : false}
            helperText={errors.identifier?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register("password", { required: true })}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={enabled}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <AlertMessage />
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;