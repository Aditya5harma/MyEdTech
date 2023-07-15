import React from 'react';
import SignupForm from '../components/core/authorisation/SignupForm';
import AuthTamplate from '../components/core/authorisation/AuthTamplate';

const Signup = () => {
    return (
        <div>
            <AuthTamplate form={<SignupForm/>}></AuthTamplate>
        </div>
    );
};

export default Signup;