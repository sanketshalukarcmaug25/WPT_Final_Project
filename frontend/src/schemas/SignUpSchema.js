import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/,"Password must be between 8 tp 12 characters, atleast one upper case, one lower case, one numeric, and no symbols allowed"),
    phone: Yup.string().required("Phone is required").matches(/^[6-9]\d{9}$/,"Phone no. is invalid"),
    address: Yup.string().required("Address is required")
});