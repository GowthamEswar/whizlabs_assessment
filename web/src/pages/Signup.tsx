import React from 'react';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { signInText } from '../utlity/texts';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { signUpType } from '../utlity/interface';
import { signUpSchema } from '../utlity/schema';

const SignUp = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<signUpType>({ resolver: yupResolver(signUpSchema) });
    const onSubmit: SubmitHandler<signUpType> = data => {
        signUp(data, navigate)
    };

    return (
        <div className="sign_in_container">
            <h1 className="title">{signInText.header}</h1>
            <p className="sub_title">{signInText.subHeader}</p>
            <div className="mtb" />
            <form className="sign_in_form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name='email'
                    register={register}
                    error={errors.email?.message ? errors.email?.message : null}
                    placeholder="Email ID"
                    className="email_input"
                />
                <div className="mtb2" />
                <PasswordField
                    name='password'
                    register={register}
                    error={errors.password?.message ? errors.password?.message : null}
                    placeholder="Password"
                    className="password_input"
                />
                <div className="mtb2" />
                <TextField
                    name='phone'
                    register={register}
                    error={errors.phone?.message ? errors.phone?.message : null}
                    placeholder="phone"
                    className="email_input"
                />
                <p className="forgot" onClick={() => { navigate('/'); }}>{signInText.forgot}</p>
                <div className="mtb1" />
                <button className="submit_btn">{signInText.btnText}</button>
            </form>
        </div>
    );
}

export default SignUp;
