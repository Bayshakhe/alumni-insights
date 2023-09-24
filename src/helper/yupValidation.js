import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  currentLocation: yup.string().required("This field is required"),
  //   currentLocation: yup.string().required("This field is required"),
  email: yup.string().email("Invalid email").required("This field is required"),
  password: yup
    .string()
    .min(4, "Minimum length 4")
    .max(8, "Maximum length 8")
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Confirm password does not matched"),
  phone: yup
    .string()
    .matches(/^01[3456789][\d]{8}/, "Phone number is not valid")
    .required("This field is required"),
  photo: yup.string().url().required("This field is required"),
  //   jobInfo: yup.object({
  //     companyName: yup.string().required("This field is required"),
  //     designation: yup.string().required("This field is required"),
  //     jobLocation: yup.string().required("This field is required"),
  //   }),
});

export default schema;
