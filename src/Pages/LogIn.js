// import React from "react";
// import { FormControl, Button, TextField } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// // import { useHistory } from "react-router";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { logIn } from "../Redux/Actions/Auth";

// function LogIn() {
//   const schema = yup.object().shape({
//     identifier: yup
//       .string()
//       // .matches(/^[a-zA-Z0-9_]*$/, "Please enter a valid identifier.")
//       .required("Please enter a valid username."),
//     password: yup
//       .string()
//       // .matches(
//       //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
//       //   "Please enter a valid password."
//       // )
//       // .min(
//       //   8,
//       //   "Password must be 8 to 15 characters long which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
//       // )
//       // .max(32)
//       .required("Please enter a valid password."),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const data = useSelector((state) => state.token);
//   const dispatch = useDispatch();
//   //   const history = useHistory();
//   const onSubmit = async (data) => {
//     const response = await dispatch(
//       logIn({
//         identifier: data.identifier,
//         password: data.password,
//       })
//     );
//     if (response?.status === 200) {
//       localStorage.setItem("isAuthenticated", "true");
//       //   history.push("/products");
//     } else {
//       localStorage.setItem("isAuthenticated", "false");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl>
//         <TextField
//           label="Username"
//           variant="outlined"
//           type="identifier"
//           {...register("identifier", { required: true })}
//           error={errors.identifier ? true : false}
//           helperText={errors.identifier?.message}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           type="password"
//           {...register("password")}
//           error={errors.password ? true : false}
//           helperText={errors.password?.message}
//         />
//         <Button variant="contained" color="primary" type="submit">
//           Sign In
//         </Button>
//       </FormControl>
//     </form>
//   );
// }

// export default LogIn;
