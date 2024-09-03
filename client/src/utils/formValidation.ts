import { FormValues } from "../models/common.models";

export const validateForm = (
    values: FormValues,
    requiredFields: (keyof FormValues)[]
) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    if (requiredFields.includes("email")) {
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }
    }

    if (requiredFields.includes("password")) {
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
    }

    if (requiredFields.includes("username")) {
        if (!values.username) {
            errors.username = "Username is required";
        } else if (values.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
        }
    }
    return errors;
};
