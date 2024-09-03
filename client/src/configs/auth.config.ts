import {FormConfig, FormField} from "../models/common.models";

export const SignInContentConfig: FormConfig = {
    title: "Sign in to your account",
    linkText: "Sign up",
    linkPath: "/signup",
    linkDescription: "Not a member?",
};

export const SignUpContentConfig: FormConfig = {
    title: "Sign up for an account",
    linkText: "Sign in",
    linkPath: "/signin",
    linkDescription: "Already have an account?",
};

export const signUpFieldsConfig: FormField[] = [
    {id: 'email', name: 'email', type: 'email', label: 'Email address', required: true},
    {id: 'username', name: 'username', type: 'text', label: 'Username', required: true},
    {id: 'password', name: 'password', type: 'password', label: 'Password', required: true},
];

export const signInFieldsConfig: FormField[] = [
    {id: 'email', name: 'email', type: 'email', label: 'Email address', required: true},
    {id: 'password', name: 'password', type: 'password', label: 'Password', required: true},
];