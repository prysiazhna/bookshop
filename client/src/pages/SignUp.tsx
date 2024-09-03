import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../store/slices/authSlice';
import AuthForm from "../components/AuthForm";
import { FormValues } from "../models/common.models";
import { validateForm } from "../utils/formValidation";
import { SignUpContentConfig, signUpFieldsConfig } from "../configs/auth.config";
import {AppDispatch, RootState} from '../store/store';
import useNavigation from "../hooks/useNavigation";

const validateSignUp = (values: FormValues) => {
    return validateForm(values, ["email", "username", "password"]);
};

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    useNavigation('/user/profile', true);

    const handleSignUpSubmit = (values: any) => {
        dispatch(signUpUser(values));
    };

    return (
        <div>
            {loading && <p>Signing up...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <AuthForm
                fields={signUpFieldsConfig}
                validate={validateSignUp}
                onSubmit={handleSignUpSubmit}
                config={SignUpContentConfig}
            />
        </div>
    );
};

export default SignUp;
