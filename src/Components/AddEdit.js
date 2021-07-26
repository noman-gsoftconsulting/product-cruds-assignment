import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function AddEdit() {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
    price: yup
      .string("Price is required.")
      .matches(/^[0-9]+$/, "Price is required")
      .required("Price is required."),
    attachment: yup.mixed("Image is required.").required("Image is required."),
    //   .test("type", "Required & Only support in jpg format", (value) => {
    //     return value && value.type === "jpg";
    //   }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [value, setValue] = useState("");

  const onSubmitProduct = async (data) => {
    // console.log(data)
    let file = data.attachment[0];
    let formData = new FormData();
    formData.append("files", file);
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
    // console.log(resp, "==============");
    const response = await dispatch(
      addProduct({
        title: data.title,
        price: data.price,
        description: data.description,
        coverPhoto: resp.data[0].id,
      })
    );
    // console.log(response.status);
    // console.log("Product Added Successfully");

    if (response.status === 200) {
      history.push("/products");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitProduct)}>
        <h2>Add New Product</h2>
        <div>
          <input
            {...register("title")}
            placeholder="Title"
            value={value.title || ""}
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div>{errors.title?.message}</div>
        </div>
        <div>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            value={value.price || ""}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div>{errors.price?.message}</div>
        </div>
        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            type="textarea"
            value={value.description || ""}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div>{errors.description?.message}</div>
        </div>
        <div>
          <label>
            <svg
              fill="#3b82f6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span>Select Image</span>
            <input
              {...register("attachment")}
              type="file"
              value={value.attachment || ""}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </label>
          <div>{errors.attachment?.message}</div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
