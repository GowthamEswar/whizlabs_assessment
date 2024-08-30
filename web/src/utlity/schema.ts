/* eslint-disable no-useless-escape */
import * as Yup from "yup";

const emailRegex = /^[\w-\.]+([+][\d]*)?@([\w-]+\.)+[\w-]{2,4}$/;
// const phoneRegex = /^([0|\+[0-9]{1,5})?([0-9]{10})$/;
const phoneRegex = /^(?=.*[0-9])[0-9+]{0,}$/;

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required.")
    .matches(emailRegex, "Invalid email address"),
  password: Yup.string().required("This field is required."),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required.")
    .matches(emailRegex, "Invalid email address"),
  password: Yup.string().required("This field is required."),
  phone: Yup.string()
  .required("This field is required")
  .matches(phoneRegex, "Please enter a valid phone number")
  .min(10, "Phone number should have atleast 10 characters")
  .max(13, "Please enter a phone number within 13 characters"),
});