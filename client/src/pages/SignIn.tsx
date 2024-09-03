import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../store/slices/authSlice';
import AuthForm from "../components/AuthForm";
import { FormValues } from "../models/common.models";
import { validateForm } from "../utils/formValidation";
import { SignInContentConfig, signInFieldsConfig } from "../configs/auth.config";
import {AppDispatch, RootState} from '../store/store';
import useNavigation from "../hooks/useNavigation";

const validateSignIn = (values: FormValues) => {
    return validateForm(values, ["email", "password"]);
};

const SignIn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    useNavigation('/user/profile', true);

    const handleSignInSubmit = (values: any) => {
        dispatch(signInUser(values));
    };

    return (
        <div>
            {loading && <p>Signing in...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <AuthForm
                fields={signInFieldsConfig}
                validate={validateSignIn}
                onSubmit={handleSignInSubmit}
                config={SignInContentConfig}
            />
        </div>
    );
};

export default SignIn;
